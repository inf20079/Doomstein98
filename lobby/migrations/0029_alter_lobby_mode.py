# Generated by Django 4.0.4 on 2022-05-15 15:59

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lobby', '0028_alter_lobby_mode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lobby',
            name='mode',
            field=models.PositiveSmallIntegerField(default=0, validators=[django.core.validators.MaxValueValidator(1, 'Since there are only two gamemodes')]),
        ),
    ]
