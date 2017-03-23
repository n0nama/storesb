from django import forms
from django.utils.translation import ugettext_lazy as _


class SearchForm(forms.Form):
    """
    Simple search form
    """
    query = forms.CharField(widget=forms.TextInput(attrs={'placeholder': _("Search"), 'autocomplete':"off"}), required=True)

