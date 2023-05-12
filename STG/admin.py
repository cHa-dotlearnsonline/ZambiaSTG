from django.contrib import admin

# Register your models here.
from  .models import StandardTreatmentGuidelineTopic, Level1Heading, Level2Heading

admin.site.register(StandardTreatmentGuidelineTopic)
admin.site.register(Level1Heading)
admin.site.register(Level2Heading)