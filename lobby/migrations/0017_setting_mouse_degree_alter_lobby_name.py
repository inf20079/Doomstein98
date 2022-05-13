# Generated by Django 4.0.4 on 2022-05-06 09:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lobby', '0016_alter_lobby_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='setting',
            name='mouse_degree',
            field=models.SmallIntegerField(default=100, help_text='The maximal degrees which can be changed in one frame'),
        ),
        migrations.AlterField(
            model_name='lobby',
            name='name',
            field=models.SlugField(error_messages={'invalid': 'No Spaces allowed'}, unique=True),
        ),
    ]