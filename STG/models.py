from django.db import models
from django_quill.fields import QuillField
# Create your models here.

class Level1Heading(models.Model):
    firstLevelHeading= models.CharField(max_length=255, blank=True)
    def serialize(self):
        return {
        "id": self.id,
        "Level 1 Heading": self.firstLevelHeading
        }
class Level2Heading(models.Model):
    firstLevelHeading=models.ForeignKey(Level1Heading, default=1, on_delete=models.CASCADE)
    secondLevelHeading = models.CharField(max_length=255, blank=True)
    def serialize(self):
        return {
        "id": self.id,
        "Level 1 Heading": self.firstLevelHeading.firstLevelHeading,
        "Level 2 Heading": self.secondLevelHeading
        }
class StandardTreatmentGuidelineTopic(models.Model):
    firstLevelHeading = models.ForeignKey(Level1Heading, on_delete=models.CASCADE)
    secondLevelHeading = models.ForeignKey(Level2Heading, on_delete=models.CASCADE)
    Level3Heading = models.CharField(max_length=255, blank=True)
    BackgroundAndClinicalFeatures = models.TextField(blank=True)
    Tests = models.TextField(blank=True)
    Notes= models.TextField(blank=True)
    TreatmentNotes= models.TextField(blank=True)
    Pharmacy= models.TextField(blank=True)
    Complications=models.TextField(blank=True)
    Prevention= models.TextField(blank=True)
    ICD11 = models.CharField(max_length=255, blank=True)
    GuidelineName= models.CharField(max_length=255, blank=True)
    Year_of_Publication = models.IntegerField(default=2020)

    def serialize(self):
        return {
        "id": self.id,
        "Level 1 Heading": self.firstLevelHeading.firstLevelHeading,
        "Level 2 Heading": self.secondLevelHeading.secondLevelHeading,
        "Level 3 Heading": self.Level3Heading,
        "Background and Clinical Features": self.BackgroundAndClinicalFeatures,
        "Tests": self.Tests,
        "Notes": self.Notes,
        "Treatment Notes": self.TreatmentNotes,
        "Pharmacy": self.Pharmacy,
        "Complications": self.Complications,
        "Prevention": self.Prevention,
        "Guideline Name": self.GuidelineName,
        "Year of Publication": self.Year_of_Publication
        }
