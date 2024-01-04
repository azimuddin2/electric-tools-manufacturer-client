import React from 'react';
import backgroundImg from '../../../assets/images/contact-bg.jpg';

const Contact = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const subject = form.subject.value;
        const message = form.message.value;

        const contactInfo = {
            email,
            subject,
            message
        };
        console.log(contactInfo);
        form.reset();
    };

    return (
        <section
            className='max-w-screen-xl mx-auto my-16'
            style={{
                background: `url(${backgroundImg})`,
                width: '100%',
                backgroundPosition: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <div className='text-center py-14 px-5 w-full'>
                <h4 className='font-semibold text-primary text-lg'>Contact Us</h4>
                <h1 className='text-2xl md:text-3xl text-white mb-10 font-normal'>Stay connected with us</h1>
                <form onSubmit={handleSubmit} className='grid grid-cols-1'>
                    <input
                        className='w-full md:w-96 lg:w-96 mx-auto mb-4 p-3 rounded input-bordered focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary'
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        required
                    />
                    <input
                        className='w-full md:w-96 lg:w-96 mx-auto mb-4 p-3 rounded input-bordered focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary'
                        type="text"
                        name='subject'
                        placeholder='Your Subject'
                        required
                    />
                    <textarea
                        className='w-full md:w-96 lg:w-96 mx-auto mb-4 p-3 rounded h-40 input-bordered focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary'
                        name='message'
                        placeholder='Your message'
                        required
                    ></textarea>
                    <input
                        className='w-24 mx-auto btn btn-primary uppercase text-white font-bold'
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
        </section>
    );
};

export default Contact;