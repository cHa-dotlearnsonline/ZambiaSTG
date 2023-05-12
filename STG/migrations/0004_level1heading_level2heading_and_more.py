# Generated by Django 4.0 on 2023-04-09 13:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('STG', '0003_alter_standardtreatmentguidelinetopic_complications_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Level1Heading',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Level1Heading', models.CharField(blank=True, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Level2Heading',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Level2Heading', models.CharField(blank=True, max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='standardtreatmentguidelinetopic',
            name='ICD11',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='standardtreatmentguidelinetopic',
            name='Level1Heading',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='STG.level1heading'),
        ),
        migrations.AlterField(
            model_name='standardtreatmentguidelinetopic',
            name='Level2Heading',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='STG.level2heading'),
        ),
    ]