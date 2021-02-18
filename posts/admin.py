from django.contrib import admin

from posts.models import Feed


class FeedAdmin(admin.ModelAdmin):
    list_display = ['title']


admin.site.register(Feed, FeedAdmin)
