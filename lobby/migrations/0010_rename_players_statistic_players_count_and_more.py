# Generated by Django 4.0.4 on 2022-05-02 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lobby', '0009_statistic'),
    ]

    operations = [
        migrations.RenameField(
            model_name='statistic',
            old_name='players',
            new_name='players_count',
        ),
        migrations.AddField(
            model_name='statistic',
            name='hit_times',
            field=models.SmallIntegerField(default=0),
        ),
    ]