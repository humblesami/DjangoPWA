from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse
from django.views.decorators.cache import never_cache

from . models import Feed
import json


def index(request):
	template = 'posts/index.html'
	results = Feed.objects.all()
	json_data = serializers.serialize('json',results)
	context = {
		'results': results,
		'json_data': json_data,
	}
	return render(request,template,context)


def get_feeds(request):
	results = Feed.objects.all()
	json_data = serializers.serialize('json',results)
	return HttpResponse(json_data)


def base_layout(request):
	template = 'posts/index.html'
	return render(request,template)