from django.shortcuts import render

from .forms import SearchForm
from accounts.functions import define_theme


# Create your views here.


def index_view(request):
    """
    Index view (render index.html). SHow search form. Randomize theme.
    :param request: HttpRequest
    :return: HttpResponse
    """
    form = SearchForm()
    theme_id = define_theme(request)
    return render(request, "index.html", {"theme_id": theme_id, 'form': form})

"""
    Views for additional pages on the main page
"""

def for_biz_view(request):
    theme_id = define_theme(request)
    return render(request, "additional/for_biz_view.html", {"theme_id": theme_id})

def advertising(request):
    theme_id = define_theme(request)
    return render(request, "additional/advertising.html", {"theme_id": theme_id})

def rules(request):
    theme_id = define_theme(request)
    return render(request, "additional/rules.html", {"theme_id": theme_id})

def privacy(request):
    theme_id = define_theme(request)
    return render(request, "additional/privacy.html", {"theme_id": theme_id})

def calculator_view(request):
    """
    Calculator view. Show calculator page
    :param request: HttpRequest
    :return: HttpResponse
    """
    form = SearchForm()
    return render(request, "calculator.html", {'form': form})
