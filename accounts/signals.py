from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in, user_logged_out

from .constants import ONLINE, OFFLINE


@receiver(user_logged_in)
def set_online_status(sender, user, request, **kwargs):
    """
    Set user's status to online, than user login
    """
    user.profile.status = ONLINE
    user.profile.save()


@receiver(user_logged_out)
def set_offline_status(sender, user, request, **kwargs):
    """
    Set user status to offline, than user logout
    """
    user.profile.status = OFFLINE
    user.profile.save()

