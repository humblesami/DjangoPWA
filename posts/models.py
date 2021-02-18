from django.db import models


class Feed(models.Model):
	author=models.CharField(max_length=50)
	title=models.CharField(max_length=100)
	body=models.TextField()


	

