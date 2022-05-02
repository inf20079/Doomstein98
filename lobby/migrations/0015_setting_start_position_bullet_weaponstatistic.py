# Generated by Django 4.0.4 on 2022-05-02 21:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lobby', '0014_alter_statistic_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='setting',
            name='start_position_bullet',
            field=models.FloatField(default=0.5, help_text='How many blocks from the player should a bullet start'),
        ),
        migrations.CreateModel(
            name='WeaponStatistic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=255)),
                ('shot_bullets', models.SmallIntegerField(default=0)),
                ('hit_times', models.SmallIntegerField(default=0)),
                ('kills', models.SmallIntegerField(default=0)),
                ('health_reduction', models.SmallIntegerField(default=0)),
                ('refilled_ammo', models.SmallIntegerField(default=0)),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lobby.statistic')),
            ],
        ),
    ]
