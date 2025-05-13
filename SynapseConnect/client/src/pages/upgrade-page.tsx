import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UpgradePage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-6 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl font-bold text-neutral-800 mb-4">Upgrade Your GPT Experience</h1>
            <p className="text-lg text-neutral-600">
              Unlock more powerful GPT capabilities and expand your creative potential with our premium tiers.
            </p>
          </div>
          
          <Tabs defaultValue="monthly" className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="annual">Annual Billing (Save 20%)</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="monthly">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Free Tier */}
                <Card className="border-primary relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full bg-primary text-white text-xs font-medium py-1 text-center">
                    Current Plan
                  </div>
                  <CardHeader className="pt-8">
                    <CardTitle>Free Tier</CardTitle>
                    <CardDescription>Basic features for starters</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$0</span>
                      <span className="text-neutral-500">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">3 active GPT slots</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Basic post generation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Standard image quality</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Simple GPT responses</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Tier 2 */}
                <Card className="border-2 border-secondary relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full bg-secondary text-white text-xs font-medium py-1 text-center">
                    Most Popular
                  </div>
                  <CardHeader className="pt-8">
                    <CardTitle>Tier 2</CardTitle>
                    <CardDescription>Enhanced capabilities</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$9.99</span>
                      <span className="text-neutral-500">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary mr-2 shrink-0" />
                        <span className="text-sm">10 active GPT slots</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary mr-2 shrink-0" />
                        <span className="text-sm">Advanced post generation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary mr-2 shrink-0" />
                        <span className="text-sm">High-quality images</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary mr-2 shrink-0" />
                        <span className="text-sm">Business and creative tips</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary mr-2 shrink-0" />
                        <span className="text-sm">Deeper GPT suggestions</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-secondary hover:bg-secondary/90">
                      Upgrade to Tier 2
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Tier 3 */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tier 3</CardTitle>
                    <CardDescription>Premium experience</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$29.99</span>
                      <span className="text-neutral-500">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">All 24 GPT slots</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Memory-based interactions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Premium image generation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Multi-style writing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Learns your tone and style</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Long-form content creation</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Upgrade to Tier 3
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="annual">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Same cards but with discounted annual pricing */}
                <Card className="border-primary relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full bg-primary text-white text-xs font-medium py-1 text-center">
                    Current Plan
                  </div>
                  <CardHeader className="pt-8">
                    <CardTitle>Free Tier</CardTitle>
                    <CardDescription>Basic features for starters</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$0</span>
                      <span className="text-neutral-500">/year</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">3 active GPT slots</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Basic post generation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Standard image quality</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Simple GPT responses</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="border-2 border-secondary relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full bg-secondary text-white text-xs font-medium py-1 text-center">
                    Most Popular
                  </div>
                  <CardHeader className="pt-8">
                    <CardTitle>Tier 2</CardTitle>
                    <CardDescription>Enhanced capabilities</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$95.90</span>
                      <span className="text-neutral-500">/year</span>
                    </div>
                    <div className="text-xs text-green-600 font-medium mt-1">Save $23.98 compared to monthly</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary mr-2 shrink-0" />
                        <span className="text-sm">10 active GPT slots</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary mr-2 shrink-0" />
                        <span className="text-sm">Advanced post generation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary mr-2 shrink-0" />
                        <span className="text-sm">High-quality images</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary mr-2 shrink-0" />
                        <span className="text-sm">Business and creative tips</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-secondary mr-2 shrink-0" />
                        <span className="text-sm">Deeper GPT suggestions</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-secondary hover:bg-secondary/90">
                      Upgrade to Tier 2
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tier 3</CardTitle>
                    <CardDescription>Premium experience</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">$287.90</span>
                      <span className="text-neutral-500">/year</span>
                    </div>
                    <div className="text-xs text-green-600 font-medium mt-1">Save $71.98 compared to monthly</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">All 24 GPT slots</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Memory-based interactions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Premium image generation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Multi-style writing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Learns your tone and style</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Long-form content creation</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Upgrade to Tier 3
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-neutral-800">What happens when I upgrade my tier?</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  When you upgrade, your GPT's capabilities will be immediately enhanced with more sophisticated responses, higher quality image generation, and additional active GPT slots.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-neutral-800">Can I downgrade my subscription?</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Yes, you can downgrade at any time. The changes will take effect at the end of your current billing cycle.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-neutral-800">What payment methods do you accept?</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  We accept all major credit cards, PayPal, and select cryptocurrency payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
