# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-08-21 17:20
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0010_auto_20160712_1131'),
    ]

    operations = [
        migrations.CreateModel(
            name='CardData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('number', models.BigIntegerField(verbose_name='Card number')),
                ('valid_throgh_month', models.IntegerField(verbose_name='Month')),
                ('valid_throgh_year', models.IntegerField(verbose_name='Year')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cards', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'ordering': ('updated',),
            },
        ),
    ]