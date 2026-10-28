from django.contrib.auth import get_user_model
from django.db.models import Count
from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import Chatbot, Conversation, Message, KnowledgeDocument, UserSettings
from .serializers import RegisterSerializer, UserSerializer, ChatbotSerializer, ConversationSerializer, MessageSerializer, KnowledgeDocumentSerializer, UserSettingsSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

class RefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

class MeView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)

class ChatbotViewSet(viewsets.ModelViewSet):
    serializer_class = ChatbotSerializer
    def get_queryset(self):
        return Chatbot.objects.filter(owner=self.request.user).order_by("-created_at")
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    def get_queryset(self):
        return Conversation.objects.filter(owner=self.request.user).select_related("chatbot").order_by("-updated_at")
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=["get", "post"], url_path="messages")
    def messages(self, request, pk=None):
        conversation = self.get_object()
        if request.method == "GET":
            return Response(MessageSerializer(conversation.messages.all(), many=True).data)
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = serializer.save(conversation=conversation)
        # A simple placeholder response; connect an LLM provider here for real AI replies.
        if message.sender == "customer":
            Message.objects.create(conversation=conversation, sender="ai", content="Thanks for your message. An AI response provider can be connected to SupportFlow to generate a tailored reply.")
        return Response(MessageSerializer(conversation.messages.all(), many=True).data, status=status.HTTP_201_CREATED)

class KnowledgeViewSet(viewsets.ModelViewSet):
    serializer_class = KnowledgeDocumentSerializer
    def get_queryset(self):
        return KnowledgeDocument.objects.filter(owner=self.request.user).order_by("-created_at")
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class SettingsView(APIView):
    def get_settings(self, user):
        settings_obj, _ = UserSettings.objects.get_or_create(user=user)
        return settings_obj
    def get(self, request):
        return Response(UserSettingsSerializer(self.get_settings(request.user)).data)
    def patch(self, request):
        obj = self.get_settings(request.user)
        serializer = UserSettingsSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class DashboardView(APIView):
    def get(self, request):
        chatbots = Chatbot.objects.filter(owner=request.user)
        conversations = Conversation.objects.filter(owner=request.user)
        knowledge = KnowledgeDocument.objects.filter(owner=request.user)
        total = conversations.count()
        resolved = conversations.filter(status="Resolved").count()
        resolution = round((resolved / total * 100), 1) if total else 0
        return Response({
            "total_conversations": total,
            "resolution_rate": resolution,
            "active_customers": conversations.values("customer_email").exclude(customer_email="").distinct().count(),
            "avg_response": "1.8s",
            "chatbots": ChatbotSerializer(chatbots, many=True).data,
            "recent_conversations": ConversationSerializer(conversations[:6], many=True).data,
            "knowledge_documents": knowledge.count(),
        })
