import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  message: z.string().min(10, "Please tell us more about your idea"),
});

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Request Received",
      description: "We will analyze your idea and get back to you within 24 hours.",
    });
    form.reset();
  }

  return (
    <div className="glass-panel p-8 md:p-12 rounded-2xl">
      <div className="mb-10">
        <h3 className="font-syne text-3xl font-bold mb-4">Initiate Protocol</h3>
        <p className="text-white/60">Tell us about your vision. We'll help you build it.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10 focus:border-white/40 h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc" {...field} className="bg-white/5 border-white/10 focus:border-white/40 h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} className="bg-white/5 border-white/10 focus:border-white/40 h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Project Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your idea or the problem you want to solve..." 
                    {...field} 
                    className="bg-white/5 border-white/10 focus:border-white/40 min-h-[150px]" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-14 bg-white text-black hover:bg-gray-200 font-bold text-lg rounded-lg mt-4">
            Submit for Analysis
          </Button>
        </form>
      </Form>
    </div>
  );
}
