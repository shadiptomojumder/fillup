import { CheckCircle, Database, Shield } from "lucide-react";

const Features = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
           
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Features
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Everything you need to streamline your job application process
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <CheckCircle className="h-10 w-10 text-primary" />
                        <h3 className="text-xl font-bold">Bilingual Support</h3>
                        <p className="text-muted-foreground">
                            Enter your details in both English and Bangla for complete form
                            compatibility.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <Database className="h-10 w-10 text-primary" />
                        <h3 className="text-xl font-bold">Secure Storage</h3>
                        <p className="text-muted-foreground">
                            Your data is securely stored and only accessible by you.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <Shield className="h-10 w-10 text-primary" />
                        <h3 className="text-xl font-bold">Privacy First</h3>
                        <p className="text-muted-foreground">
                            We never share your personal information with third parties.
                        </p>
                    </div>
                </div>
            
        </section>
    );
};

export default Features;
