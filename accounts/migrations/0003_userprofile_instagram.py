# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-27 11:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_activationprofile_password_reset'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='instagram',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Instagram'),
        ),
    ]
