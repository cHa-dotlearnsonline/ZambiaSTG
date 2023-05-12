from django.shortcuts import render
from django.http import JsonResponse
from .models import StandardTreatmentGuidelineTopic, Level1Heading, Level2Heading
# Create your views here.

def index(request):
    return render(request, 'STG/index.html')


def stgbooklet(request):
    #Let's get all level 1 headings
    all_level_1_headings = Level1Heading.objects.all()
    #Let's create a list which will hold all the query sets for each level 2 heading for each level 1 heading
    level_2_headings_grouped_under_level_1 = []
    topics_grouped_according_levels_of_heading= []

    for level_1_heading in all_level_1_headings:
        all_level_3_headings_for_level_2_topic = StandardTreatmentGuidelineTopic.objects.filter(firstLevelHeading=level_1_heading)
        serialized_topics = [topic.serialize() for topic in all_level_3_headings_for_level_2_topic]
        topics_grouped_according_levels_of_heading.append(serialized_topics)
    return JsonResponse(topics_grouped_according_levels_of_heading, safe=False)