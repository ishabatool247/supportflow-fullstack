from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Chatbot, Conversation, Message, KnowledgeDocument, UserSettings

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "first_name", "last_name")
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        UserSettings.objects.get_or_create(user=user)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")

class ChatbotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatbot
        fields = ("id", "name", "description", "status", "resolution_rate", "conversations_count", "created_at")
        read_only_fields = ("id", "created_at")

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ("id", "sender", "content", "created_at")

class ConversationSerializer(serializers.ModelSerializer):
    chatbot_name = serializers.CharField(source="chatbot.name", read_only=True, default="")
    class Meta:
        model = Conversation
        fields = ("id", "customer_name", "customer_email", "subject", "status", "priority", "channel", "chatbot", "chatbot_name", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")

class KnowledgeDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeDocument
        fields = ("id", "title", "content", "source", "status", "created_at")
        read_only_fields = ("id", "created_at")

class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = ("workspace_name", "email_notifications", "weekly_report")
