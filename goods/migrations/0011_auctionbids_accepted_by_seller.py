# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-08-11 21:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goods', '0010_auto_20160621_1148'),
    ]

    operations = [
        migrations.AddField(
            model_name='auctionbids',
            name='accepted_by_seller',
            field=models.BooleanField(default=False, verbose_name='Bid accepted'),
        ),
    ]