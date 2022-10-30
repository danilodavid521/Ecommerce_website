import React from "react";
import { Header } from "../../components";
import { CiPhone } from "react-icons/ci";
import { AiOutlineMail, AiOutlineTwitter } from "react-icons/ai";

const Contact = () => {
	return (
		<>
			<Header text="Contact Us" />
			<main className="w-full mx-auto px-2 md:w-9/12 md:px-6 mt-6 flex flex-col md:flex-row justify-between gap-10">
				<section className="w-full md:w-[30rem] bg-primary-content rounded-md p-6 min-h-max">
					{/* Card */}
					<div className="mb-4">
						<h1 className="text-3xl">Contact Information</h1>
						<p className="text-lg">Fill the form or contact us via other channels</p>
					</div>
					<div>
						<div className="flex items-center gap-2 my-2 text-xl">
							<AiOutlineMail />
							<a href="mailto: Support@eshop.com?subject=Feedback&body=message">
								Support@eshop.com
							</a>
						</div>
						<div className="flex items-center gap-2  my-2 text-xl">
							<CiPhone />
							<a href="tel:+91-123-12345">91-123-12345</a>
						</div>
						<div className="flex items-center gap-2 text-xl  my-2">
							<AiOutlineTwitter />
							<a
								href="https://twitter.com/kartik_im"
								rel="noreferrer"
								target="_blank"
							>
								@kartik_im
							</a>
						</div>
					</div>
				</section>
				<section className="w-full md:w-2/3 rounded-md shadow-lg border-2 p-6">
					{/* Form */}
					<h1 className="text-3xl">Contact Us</h1>
					<form className="form-control">
						<div className="py-2">
							<label className="label-text font-semibold mb-2 block text-lg">
								Name :
							</label>
							<input
								className="input input-bordered max-w-lg w-full border-2"
								type="text"
								placeholder="Full Name"
								required
								// name="name"
								// value={product.name}
								// onChange={handleInputChange}
							/>
						</div>
						<div className="py-2">
							<label className="label-text font-semibold mb-2 block text-lg">
								Email :
							</label>
							<input
								className="input input-bordered max-w-lg w-full border-2"
								type="email"
								placeholder="Active Email"
								required
								// name="name"
								// value={product.name}
								// onChange={handleInputChange}
							/>
						</div>
						<div className="py-2">
							<label className="label-text font-semibold mb-2 block text-lg">
								Subject :
							</label>
							<input
								className="input input-bordered max-w-lg w-full border-2"
								type="text"
								placeholder="Subject"
								required
								// name="name"
								// value={product.name}
								// onChange={handleInputChange}
							/>
						</div>
						<div className="py-2">
							<label className="label-text font-semibold mb-2 block text-lg">
								Message :
							</label>
							<textarea
								className="textarea textarea-bordered"
								cols={50}
								rows={7}
							></textarea>
						</div>
						<button className="btn max-w-xs w-full">Send Message</button>
					</form>
				</section>
			</main>
		</>
	);
};

export default Contact;
