from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import Chatbot, Conversation, Message, KnowledgeDocument, UserSettings

class Command(BaseCommand):
    help = "Create demo user and sample SupportFlow data."
    def handle(self, *args, **options):
        User = get_user_model()
        user, created = User.objects.get_or_create(username="demo@supportflow.local", defaults={"email":"demo@supportflow.local", "first_name":"Demo", "last_name":"User"})
        if created or not user.has_usable_password():
            user.set_password("SupportFlow123!")
            user.save()
        UserSettings.objects.get_or_create(user=user, defaults={"workspace_name":"SupportFlow Demo"})
        if not Chatbot.objects.filter(owner=user).exists():
            bot1 = Chatbot.objects.create(owner=user, name="Customer Support", description="Handles common customer questions", resolution_rate=91.2, conversations_count=8421)
            Chatbot.objects.create(owner=user, name="Sales Assistant", description="Helps qualify leads and answer product questions", resolution_rate=84.7, conversations_count=2846)
            Chatbot.objects.create(owner=user, name="Order Support", description="Order status and delivery help", resolution_rate=79.5, conversations_count=1219)
            c1 = Conversation.objects.create(owner=user, chatbot=bot1, customer_name="Olivia Martin", customer_email="olivia@example.com", subject="Order delivery update", status="Open", priority="High")
            Message.objects.create(conversation=c1, sender="customer", content="Hi, could you please check the status of my order?")
            Message.objects.create(conversation=c1, sender="ai", content="Of course! I can help with that. Please share your order number.")
            Conversation.objects.create(owner=user, chatbot=bot1, customer_name="Noah Williams", customer_email="noah@example.com", subject="Return policy question", status="Resolved", priority="Normal")
            Conversation.objects.create(owner=user, chatbot=bot1, customer_name="Ava Johnson", customer_email="ava@example.com", subject="Product availability", status="Pending", priority="Normal")
            KnowledgeDocument.objects.create(owner=user, title="Returns & Refunds Policy", source="Website", content="Items can be returned within 30 days of delivery.")
            KnowledgeDocument.objects.create(owner=user, title="Shipping Information", source="Help Center", content="Standard delivery takes 3–5 business days.")
        self.stdout.write(self.style.SUCCESS("Demo data ready. Login: demo@supportflow.local / SupportFlow123!"))
