from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^for-business/$', views.for_biz_view, name='for_biz_view'),
    url(r'^advertising/$', views.advertising, name='advertising'),
    url(r'^rules/$', views.rules, name='rules'),
    url(r'^privacy/$', views.privacy, name='privacy'),
    url(r'^calculator/$', views.calculator_view, name='calculator')
]