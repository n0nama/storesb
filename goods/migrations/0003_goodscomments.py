# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-30 22:44
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('goods', '0002_auto_20160530_2237'),
    ]

    operations = [
        migrations.CreateModel(
            name='GoodsComments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('text', models.TextField(verbose_name='Comment')),
                ('good', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='goods.Good')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='goods_comments', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
