from django.utils.translation import ugettext as _
from storesb.settings import EMAIL_HOST_USER

from accounts.tasks import send_email_task

email_message = _(
                    """Hello! You was registered on site storesb.com. \n
                    Your username: {username} \n
                    You should activate your account by clicking this link:
                    <a href="http://{site}/accounts/activation/{token}">
                    http://{site}/accounts/activation/{token}
                    </a> \n
                    Thank you!""".format(username="test", site='storesb',
                                         token='122212221'))
send_email_task.delay("Activate your account", email_message, EMAIL_HOST_USER, 'freempt1@gmail.com')