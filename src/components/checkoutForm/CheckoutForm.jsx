import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const saveOrder = () => {
		console.log("order Saved");
	};

	useEffect(() => {
		if (!stripe) {
			return;
		}
		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);
		if (!clientSecret) {
			return;
		}
		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);
		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);
		const confirmPayment = await stripe
			.confirmPayment({
				elements,
				confirmParams: {
					// Make sure to change this to your payment completion page
					return_url: "http://localhost:5173/checkout-success",
				},
				redirect: "if_required",
			})
			.then((res) => {
				if (res.error) {
					setMessage(res.error.message);
					toast.error(res.error.message);
					return;
				}
				if (res.paymentIntent) {
					if (res.paymentIntent.status === "succeeded") {
						setIsLoading(false);
						toast.success("Payment Successful");
						saveOrder();
						navigate("/checkout-success", { replace: true });
					}
				}
			});
		setIsLoading(false);
	};

	return (
		<>
			<Breadcrumbs type="cart" checkout="Checkout-Details" stripe="Stripe-Payment" />
			<section className="w-full mx-auto p-4 md:p-10 md:w-9/12 md:px-6 flex flex-col h-full">
				<div className="flex flex-col-reverse md:flex-row gap-4 justify-evenly">
					<div className="w-full md:w-2/5 h-max p-4 bg-base-100 rounded-md shadow-xl">
						<CheckoutSummary />
					</div>
					<div className="rounded-md shadow-xl pt-4 pb-8 px-10">
						<h1 className="text-3xl font-light mb-2">Stripe Checkout</h1>
						<form id="payment-form" onSubmit={handleSubmit}>
							<PaymentElement id="payment-element" />
							<button
								disabled={isLoading || !stripe || !elements}
								id="submit"
								className="btn btn-primary"
							>
								<span id="button-text">
									{isLoading ? (
										<div className="spinner" id="spinner"></div>
									) : (
										"Pay now"
									)}
								</span>
							</button>
							{/* Show any error or success messages */}
							{message && <div id="payment-message">{message}</div>}
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default CheckoutForm;
