const HowItWorks = () => {
    return (
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32" id="how-it-works">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        How It Works
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Three simple steps to save hours on your government job applications
                    </p>
                </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <span className="text-2xl font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold">Install Extension</h3>
                    <p className="text-muted-foreground">
                        Download and install our Chrome extension from the Chrome Web Store.
                    </p>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <span className="text-2xl font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold">Create Account</h3>
                    <p className="text-muted-foreground">
                        Sign up and enter your personal details once in our secure platform.
                    </p>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <span className="text-2xl font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold">Auto-Fill Forms</h3>
                    <p className="text-muted-foreground">
                        Use our extension to automatically fill out any government job application
                        form.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
