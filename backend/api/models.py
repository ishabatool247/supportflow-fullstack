from django.conf import settings
from django.db import models

class Chatbot(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="chatbots")
    name = models.CharField(max_length=120)
    description = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, default="Active")
    resolution_rate = models.DecimalField(max_digits=5, decimal_places=1, default=85.0)
    conversations_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class Conversation(models.Model):
    STATUS_CHOICES = [("Open", "Open"), ("Resolved", "Resolved"), ("Pending", "Pending")]
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="conversations")
    chatbot = models.ForeignKey(Chatbot, on_delete=models.SET_NULL, null=True, blank=True, related_name="conversations")
    customer_name = models.CharField(max_length=120, default="New customer")
    customer_email = models.EmailField(blank=True)
    subject = models.CharField(max_length=255, default="New conversation")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Open")
    priority = models.CharField(max_length=20, default="Normal")
    channel = models.CharField(max_length=30, default="Website")
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.subject

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.CharField(max_length=20, default="customer")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["created_at"]

class KnowledgeDocument(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="knowledge_documents")
    title = models.CharField(max_length=180)
    content = models.TextField(blank=True)
    source = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, default="Ready")
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title

class UserSettings(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="app_settings")
    workspace_name = models.CharField(max_length=120, default="My workspace")
    email_notifications = models.BooleanField(default=True)
    weekly_report = models.BooleanField(default=False)
