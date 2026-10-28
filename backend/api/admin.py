from django.contrib import admin
from .models import Chatbot, Conversation, Message, KnowledgeDocument, UserSettings
admin.site.register([Chatbot, Conversation, Message, KnowledgeDocument, UserSettings])
