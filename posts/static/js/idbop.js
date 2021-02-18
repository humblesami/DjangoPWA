(function(){
    let db_name = 'feeds-db';
    let data_set_name = 'feeds';
    var dbPromise = idb.open(db_name, 5, function(upgradeDb) {
        upgradeDb.createObjectStore(data_set_name,{keyPath:'pk'});
    });

	//collect latest post from server and store in idb
	let host_url = window.location.origin + '';

	console.log(1, new Date().getSeconds() + '-'+ new Date().getMilliseconds());
	render_local_data();

	fetch(host_url + '/get/feeds').then(function(response){
		console.log(2, new Date().getSeconds() + '-'+ new Date().getMilliseconds());
		return response.json();
	}).then(function(jsondata){
	    console.log(jsondata);
		dbPromise.then(function(db){
			var tx = db.transaction(data_set_name, 'readwrite');
	  		var feedsStore = tx.objectStore(data_set_name);
	  		for(var key in jsondata){
	  			if (jsondata.hasOwnProperty(key)) {
			    	feedsStore.put(jsondata[key]);
			  	}
	  		}
	  		render_local_data(1);
		});
	});


	function render_local_data(after_server=0){
        //retrieve data from idb and display on page
        var post="";
        dbPromise.then(function(db){
            var tx = db.transaction(data_set_name, 'readonly');
            var feedsStore = tx.objectStore(data_set_name);
            return feedsStore.openCursor();
        }).then(function logItems(cursor) {
          if (!cursor) {
            console.log(3, after_server, new Date().getSeconds() + '-'+ new Date().getMilliseconds());
            document.getElementById('offline_feeds').innerHTML=post;
            return;
          }
          for (var field in cursor.value) {
                if(field=='fields'){
                    feedsData=cursor.value[field];
                    for(var key in feedsData){
                        if(key =='title'){
                            var title = '<h3>'+feedsData[key]+'</h3>';
                        }
                        if(key =='author'){
                            var author = feedsData[key];
                        }
                        if(key == 'body'){
                            var body = '<p>'+feedsData[key]+'</p>';
                        }
                    }
                    post=post+'<br>'+title+'<br>'+author+'<br>'+body+'<br>';
                }
            }
          return cursor.continue().then(logItems);
        });
	}
})()

