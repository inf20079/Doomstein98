# Generated by Django 4.0.4 on 2022-05-15 15:56

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lobby', '0027_setting_countdown_start_game'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lobby',
            name='mode',
            field=models.PositiveSmallIntegerField(default=0, validators=[django.core.validators.MaxLengthValidator(1, 'Since there are only two gamemodes')]),
        ),
    ]
