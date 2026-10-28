from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import RegisterView, LoginView, RefreshView, MeView, ChatbotViewSet, ConversationViewSet, KnowledgeViewSet, SettingsView, DashboardView

router = DefaultRouter()
router.register("chatbots", ChatbotViewSet, basename="chatbot")
router.register("conversations", ConversationViewSet, basename="conversation")
router.register("knowledge", KnowledgeViewSet, basename="knowledge")

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/refresh/", RefreshView.as_view(), name="refresh"),
    path("auth/me/", MeView.as_view(), name="me"),
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("settings/", SettingsView.as_view(), name="settings"),
    path("", include(router.urls)),
]
