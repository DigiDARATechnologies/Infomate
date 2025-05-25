import Link from "next/link"
import Image from "next/image"
import {
  BookOpen,
  GraduationCap,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">KNCET</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#home" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="#courses" className="text-sm font-medium hover:text-primary">
              Courses
            </Link>
            <Link href="#facilities" className="text-sm font-medium hover:text-primary">
              Facilities
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Student Login
            </Button>
            <Button size="sm">Apply Now</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden bg-muted py-20 md:py-24 lg:py-32">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Campus"
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>
          <div className="container relative z-10 flex flex-col items-center text-center">
            <Badge className="mb-4" variant="outline">
              Autonomous | Accredited | Industry-Connected
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Kongunadu College of Engineering and Technology
            </h1>
            <p className="mt-4 text-xl text-muted-foreground md:text-2xl">Empowering Engineers since 2007</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg">
                Explore Programs
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Virtual Tour
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card className="border-primary/20">
                <CardContent className="p-4 flex flex-col items-center">
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">NAAC Accredited</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-4 flex flex-col items-center">
                  <Building2 className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">NBA Approved</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-4 flex flex-col items-center">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">Est. 2007</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-4 flex flex-col items-center">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">ISO 9001:2015</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="College Campus"
                  width={800}
                  height={600}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About the College</h2>
                <p className="text-muted-foreground">
                  Established in 2007, Kongunadu College of Engineering and Technology (KNCET) is a premier educational
                  institution affiliated to Anna University, Chennai. With a commitment to excellence, we have earned
                  various approvals and accreditations that reflect our dedication to quality education.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Established</p>
                      <p className="text-sm text-muted-foreground">2007</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Affiliated to</p>
                      <p className="text-sm text-muted-foreground">Anna University, Chennai</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Approvals</p>
                      <p className="text-sm text-muted-foreground">AICTE, UGC (2f, 12B), NAAC, NBA</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Programs</p>
                      <p className="text-sm text-muted-foreground">9 UG and 2 PG programs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Certification</p>
                      <p className="text-sm text-muted-foreground">ISO 9001:2015 Certified</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Research</p>
                      <p className="text-sm text-muted-foreground">Research Centre in ECE Department</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  Learn More About KNCET
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Courses Offered</h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Explore our diverse range of undergraduate and postgraduate programs
              </p>
            </div>

            <Tabs defaultValue="ug" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="ug">Undergraduate Programs</TabsTrigger>
                  <TabsTrigger value="pg">Postgraduate Programs</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="ug">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Computer Science and Engineering",
                      icon: <BookOpen className="h-10 w-10 text-primary" />,
                      code: "CSE",
                    },
                    {
                      name: "Information Technology",
                      icon: <BookOpen className="h-10 w-10 text-primary" />,
                      code: "IT",
                    },
                    {
                      name: "Electronics and Communication Engineering",
                      icon: <BookOpen className="h-10 w-10 text-primary" />,
                      code: "ECE",
                    },
                    {
                      name: "Electrical and Electronics Engineering",
                      icon: <BookOpen className="h-10 w-10 text-primary" />,
                      code: "EEE",
                    },
                    {
                      name: "Bio-Medical Engineering",
                      icon: <BookOpen className="h-10 w-10 text-primary" />,
                      code: "BME",
                    },
                    {
                      name: "Mechanical Engineering",
                      icon: <BookOpen className="h-10 w-10 text-primary" />,
                      code: "MECH",
                    },
                    { name: "Civil Engineering", icon: <BookOpen className="h-10 w-10 text-primary" />, code: "CIVIL" },
                    {
                      name: "Agricultural Engineering",
                      icon: <BookOpen className="h-10 w-10 text-primary" />,
                      code: "AGRI",
                    },
                    {
                      name: "Artificial Intelligence",
                      icon: <BookOpen className="h-10 w-10 text-primary" />,
                      code: "AI",
                    },
                  ].map((course, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                      <CardHeader className="pb-2">
                        <div className="mb-2">{course.icon}</div>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>B.E / B.Tech - 4 Years</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{course.code}</Badge>
                          <Button variant="ghost" size="sm">
                            Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="pg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Master of Computer Applications",
                      icon: <BookOpen className="h-10 w-10 text-primary" />,
                      code: "MCA",
                    },
                    {
                      name: "M.E. Communication Systems",
                      icon: <BookOpen className="h-10 w-10 text-primary" />,
                      code: "M.E CS",
                    },
                  ].map((course, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                      <CardHeader className="pb-2">
                        <div className="mb-2">{course.icon}</div>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>2 Years</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{course.code}</Badge>
                          <Button variant="ghost" size="sm">
                            Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Campus Facilities</h2>
              <p className="mt-4 text-xl text-muted-foreground">
                State-of-the-art infrastructure to support your educational journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Modern Laboratories",
                  description: "Well-equipped labs with the latest technology and equipment",
                },
                {
                  title: "Digital Library",
                  description: "Access to thousands of e-books, journals, and research papers",
                },
                {
                  title: "Sports Complex",
                  description: "Indoor and outdoor sports facilities for physical development",
                },
                {
                  title: "Hostel Accommodation",
                  description: "Separate hostels for boys and girls with modern amenities",
                },
                { title: "Placement Cell", description: "Dedicated team for career guidance and placement assistance" },
                {
                  title: "Research Centers",
                  description: "Advanced research facilities for innovation and development",
                },
              ].map((facility, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-video relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=500&text=${facility.title}`}
                      alt={facility.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{facility.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{facility.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Begin Your Journey at KNCET</h2>
            <p className="mt-4 text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Join us to build a successful career with quality education and industry exposure
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Apply for Admission
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h2>
                <p className="mt-4 text-muted-foreground">
                  Have questions? Reach out to us through any of these channels.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">
                        Kongunadu College of Engineering and Technology,
                        <br />
                        Thottiam, Trichy District,
                        <br />
                        Tamil Nadu - 621215
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+91 9876543210</p>
                      <p className="text-muted-foreground">04326-277266</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">info@kncet.edu.in</p>
                      <p className="text-muted-foreground">admissions@kncet.edu.in</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon">
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <input
                            id="name"
                            placeholder="Your name"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <input
                          id="subject"
                          placeholder="Subject"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          placeholder="Your message"
                          rows={4}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">KNCET</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Kongunadu College of Engineering and Technology is committed to providing quality education and
                producing industry-ready engineers.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Placements
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Research
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Library
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    E-Learning
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Kongunadu College of Engineering and Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
