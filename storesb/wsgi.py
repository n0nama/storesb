"""
WSGI config for storesb project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os
import sys
import uwsgi

from django.utils import autoreload

sys.path.append('/webapps/storesb')
sys.path.append('/webapps/storesb/storesb')

os.path.join(os.path.abspath(os.path.dirname(__file__)), '..')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "storesb.settings")

from django.core.wsgi import get_wsgi_application
import django.core.handlers.wsgi
application = get_wsgi_application()
application = django.core.handlers.wsgi.WSGIHandler()


def change_code_gracefull_reload(sig):
    if autoreload.code_changed():
        uwsgi.reload()
