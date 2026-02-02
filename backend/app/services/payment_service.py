from typing import Optional, Dict, Any
import razorpay
from backend.app.core.config import settings
import uuid


class PaymentService:
    def __init__(self):
        self.client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

    def create_order(
            self,
            amount: float,
            currency: str = "INR",
            receipt: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        """Create Razorpay order"""
        try:
            if not receipt:
                receipt = f"receipt_{uuid.uuid4().hex[:10]}"

            order_data = {
                "amount": int(amount * 100),  # Razorpay expects amount in paise
                "currency": currency,
                "receipt": receipt,
                "payment_capture": 1  # Auto-capture payment
            }

            order = self.client.order.create(data=order_data)
            return order
        except Exception as e:
            print(f"Error creating order: {e}")
            return None

    def verify_payment_signature(
            self,
            razorpay_order_id: str,
            razorpay_payment_id: str,
            razorpay_signature: str
    ) -> bool:
        """Verify Razorpay payment signature"""
        try:
            params_dict = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            }

            self.client.utility.verify_payment_signature(params_dict)
            return True
        except razorpay.errors.SignatureVerificationError:
            return False
        except Exception as e:
            print(f"Error verifying signature: {e}")
            return False

    def get_order(self, order_id: str) -> Optional[Dict[str, Any]]:
        """Get order details"""
        try:
            return self.client.order.fetch(order_id)
        except Exception as e:
            print(f"Error fetching order: {e}")
            return None

    def capture_payment(self, payment_id: str, amount: float) -> Optional[Dict[str, Any]]:
        """Capture payment (for manual capture)"""
        try:
            return self.client.payment.capture(payment_id, amount * 100)
        except Exception as e:
            print(f"Error capturing payment: {e}")
            return None