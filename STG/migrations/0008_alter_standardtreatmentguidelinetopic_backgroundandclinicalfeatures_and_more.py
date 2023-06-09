# Generated by Django 4.0 on 2023-04-09 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('STG', '0007_rename_level_1_heading_level1heading_firstlevelheading_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='standardtreatmentguidelinetopic',
            name='BackgroundAndClinicalFeatures',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='standardtreatmentguidelinetopic',
            name='Complications',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='standardtreatmentguidelinetopic',
            name='Pharmacy',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='standardtreatmentguidelinetopic',
            name='Prevention',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='standardtreatmentguidelinetopic',
            name='Tests',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='standardtreatmentguidelinetopic',
            name='TreatmentNotes',
            field=models.TextField(blank=True),
        ),
    ]
