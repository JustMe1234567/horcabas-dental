# Horcabas Dental Clinic Website — Design Guide

## 1. Design Reference

This design guide is for Horcabas Dental Clinic and is visually inspired by the provided Bright Smiles Dental Care reference image. Bright Smiles is a design reference only; its name and contact information must never appear in the finished site.

### Clinic Details

- **Clinic name:** Horcabas Dental Clinic
- **Phone:** 0969 519 5316
- **Telephone link:** `tel:+639695195316`
- **Email:** horcabasclinic@gmail.com
- **Email link:** `mailto:horcabasclinic@gmail.com`
- **Address:** 2nd Floor, JSPC Arcade, Lower Langcangan, Oroquieta City, Philippines
- **Coordinates:** `8.481607047025747, 123.80391177356363`
- **Google Maps:** `https://www.google.com/maps?q=8.481607047025747,123.80391177356363`

Clinic operating hours are not yet confirmed. Use “Call for current clinic hours” until real hours are provided.

The intended visual style is:

- Clean
- Professional
- Medical/dental
- Trustworthy
- Family-friendly
- Modern but not overly minimal
- Light, bright, and spacious
- Blue-and-white healthcare branding
- Strong call-to-action areas
- Serif headings with clean sans-serif body text

The website should feel like a polished private dental clinic, not a generic appointment app.

---

## 2. Product Context

This design is for a dental clinic website built with Next.js.

The website should support these user-facing goals:

1. Present the dental clinic professionally.
2. Show dental services clearly.
3. Display available appointment schedules.
4. Tell patients to call the clinic to book.
5. Allow patients to search for current/upcoming appointments using their phone number.
6. Provide contact details, location, and clinic hours.

Important: users do not book directly online.

The main booking message should be:

```text
View available times, then call the clinic to reserve your appointment.
```

Avoid UI wording that implies instant online booking unless that feature is added later.

---

## 3. Overall Page Structure

Recommended landing page order:

```text
Top Info Bar
Main Navbar
Hero Section
Trust / Feature Strip
Services Section
About Section
Why Choose Us Section
Available Schedule Section
Find My Appointment Section
Patient Testimonials
Call-to-Book CTA Banner
Footer
```

The reference image uses this general structure:

```text
Top contact bar
Navigation
Hero with large headline and dental photo
Small feature icons
Services cards
About section with image and text
Why choose us icons
Testimonials
Large blue CTA banner
Footer
```

For our app, replace the strongest online-booking CTAs with call-to-book wording.

---

## 4. Brand Mood

The design should communicate:

- Expertise
- Safety
- Cleanliness
- Comfort
- Modern dental care
- Family care
- Friendly service
- Trust and professionalism

Use lots of white space, soft blue backgrounds, light card borders, rounded corners, and line-style dental icons.

---

## 5. Color Palette

Approximate colors inspired by the reference:

### Primary Navy

Used for headers, footer, major text, and dark CTA sections.

```css
--color-navy: #062B49;
```

### Deep Navy

Used for top bar/footer background.

```css
--color-deep-navy: #04243D;
```

### Dental Blue

Used for primary buttons, active nav underline, icons, and highlights.

```css
--color-primary-blue: #1598C7;
```

### Bright Blue Hover

Used for button hover states.

```css
--color-primary-blue-hover: #0F83AD;
```

### Light Blue Background

Used for hero background, feature strip, and subtle sections.

```css
--color-light-blue: #EAF6FB;
```

### Pale Blue Tint

Used for alternating section backgrounds.

```css
--color-pale-blue: #F4FAFD;
```

### Text Navy

Used for main headings.

```css
--color-heading: #0B2F4A;
```

### Body Text

Used for paragraphs.

```css
--color-body: #465A66;
```

### Muted Text

Used for secondary labels and helper text.

```css
--color-muted: #6B7C87;
```

### Border

Used for cards, dividers, and form fields.

```css
--color-border: #DCEAF1;
```

### White

Used for main content surfaces.

```css
--color-white: #FFFFFF;
```

### Warning / Attention

Use sparingly for errors or unavailable schedule messages.

```css
--color-warning: #B45309;
```

### Success / Available

Use subtly for availability states if needed.

```css
--color-success: #0F766E;
```

---

## 6. Typography

The reference uses elegant serif-style headings paired with clean sans-serif navigation/body text.

Recommended font pairing:

### Headings

Use a classic serif font.

Good options:

```text
Playfair Display
Lora
Merriweather
Cormorant Garamond
```

Recommended:

```text
Playfair Display
```

### Body and UI

Use a clean sans-serif font.

Good options:

```text
Inter
Nunito Sans
Poppins
Source Sans 3
```

Recommended:

```text
Inter
```

### Typography Usage

```css
body {
  font-family: Inter, system-ui, sans-serif;
}

h1, h2, h3 {
  font-family: "Playfair Display", Georgia, serif;
}
```

### Heading Style

Hero headline should be large, bold, and serif.

Example:

```text
Exceptional Dental Care for the Whole Family
```

Section headings should also use serif typography.

Example:

```text
Comprehensive Care for a Healthy Smile
```

Small section labels should use uppercase sans-serif text.

Example:

```text
OUR DENTAL SERVICES
```

---

## 7. Layout System

### Max Width

Use a centered container.

```css
max-width: 1180px;
margin-inline: auto;
padding-inline: 24px;
```

### Section Spacing

Desktop:

```css
padding-block: 80px;
```

Mobile:

```css
padding-block: 56px;
```

### Grid

Common grid patterns:

```text
Hero: 2 columns
Services: 5 cards on desktop, 2 on tablet, 1 on mobile
About: image + text, 2 columns on desktop
Why Choose Us: 5 icon columns on desktop
Testimonials: 3 cards on desktop
Footer: 4 or 5 columns on desktop
```

### Breakpoints

Suggested Tailwind-style breakpoints:

```text
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

---

## 8. Buttons

### Primary Button

Use for the main call action.

Visual style:

- Dental blue background
- White text
- Rounded corners
- Medium weight
- Icon optional
- Slight hover darkening

Text examples:

```text
Call to Book
View Available Times
Call Clinic
```

Avoid using:

```text
Book Appointment
```

unless it clearly means calling the clinic.

Suggested CSS:

```css
.primary-button {
  background: #1598C7;
  color: white;
  border-radius: 6px;
  padding: 14px 24px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.02em;
}
```

### Secondary Button

Used for less prominent actions.

Example:

```text
Our Services
Learn More
```

Visual style:

- White or transparent background
- Navy text
- Border
- Small arrow icon

```css
.secondary-button {
  background: white;
  color: #062B49;
  border: 1px solid #9ECFE1;
  border-radius: 6px;
  padding: 14px 24px;
  font-weight: 700;
}
```

### CTA Button Labels

Use these labels:

```text
View Available Times
Call to Book
Call Clinic
Find My Appointment
Our Services
Learn More
```

Avoid misleading labels:

```text
Confirm Booking
Reserve Online
Book Now
```

---

## 9. Top Info Bar

The top bar should match the reference:

- Full-width deep navy background
- White text
- Small icons
- Address on the left
- Hours in the center
- Phone/social icons on the right

Desktop layout:

```text
[Location icon] Lower Langcangan, Oroquieta City
[Clock icon] Call for current clinic hours
[Phone icon] 0969 519 5316
[Social icons]
```

Mobile behavior:

- Can stack into 2 rows
- Or hide social icons
- Keep phone number visible

Recommended height:

```text
36px–44px desktop
auto on mobile
```

---

## 10. Main Navbar

The navbar should be white with a clean shadow or bottom border.

Layout:

```text
[Logo]  Home  About Us  Services  Patients  Gallery  Reviews  Contact Us  [Call to Book]
```

For our MVP, preferred nav:

```text
[Logo] Home About Services Schedule Find Appointment Contact [Call to Book]
```

### Logo Direction

Use a tooth icon plus clinic name.

Example:

```text
HORCABAS
DENTAL CLINIC
```

Logo style:

- Tooth outline icon
- Navy text
- Blue icon accent
- Uppercase clinic name
- Letter spacing for subtitle

### Active Nav State

The active item should use:

- Primary blue text
- Small blue underline

---

## 11. Hero Section

The hero should closely follow the reference.

### Layout

Desktop:

```text
Left side:
- Small uppercase eyebrow text
- Large serif headline
- Short supporting paragraph
- Primary CTA
- Secondary CTA
- Small feature icons

Right side:
- Large smiling patient/dental treatment image
```

Mobile:

```text
Hero text
Buttons
Image
Feature icons
```

### Hero Background

Use very light blue.

```css
background: #EAF6FB;
```

Optional: use a curved/organic white overlay behind image if feasible.

### Eyebrow Text

Example:

```text
HEALTHY SMILE. HEALTHY YOU.
```

Style:

- Uppercase
- Small
- Primary blue
- Bold
- Letter spacing

### Hero Headline

Use a strong serif heading.

Example:

```text
Exceptional Dental Care for the Whole Family
```

Alternative for this project:

```text
Gentle Dental Care for Every Smile
```

### Hero Body

Example:

```text
We provide modern, gentle dental care for the whole family in a comfortable and welcoming environment.
```

### Hero CTAs

Since users must call first:

Primary:

```text
View Available Times
```

Secondary:

```text
Our Services
```

Optional third mobile CTA:

```text
Call Clinic
```

### Hero Feature Strip

The reference has four small trust items below the buttons.

Use:

```text
Advanced Technology
Comfortable Environment
Insurance Accepted
Experienced Dentists
```

For our project, this can become:

```text
Modern Equipment
Gentle Treatment
Family Friendly
Call-to-Book Scheduling
```

Each item should have:

- Blue line icon
- Short label
- Light divider between items on desktop

---

## 12. Services Section

Reference style:

- White background
- Left heading
- Right short paragraph and button
- Row of card components
- Dental line icons
- Card hover effect

### Section Label

```text
OUR DENTAL SERVICES
```

### Heading

```text
Comprehensive Care for a Healthy Smile
```

### Intro Text

```text
From preventive care to restorative treatments, our clinic provides dental services for patients of all ages.
```

### Cards

Recommended services:

```text
General Dentistry
Cosmetic Dentistry
Dental Implants
Orthodontics
Preventive Care
```

For a smaller clinic, use:

```text
Dental Consultation
Oral Prophylaxis / Cleaning
Tooth Extraction
Teeth Whitening
Dental Fillings
```

### Card Style

- White background
- Light border
- Subtle shadow on hover
- Centered icon
- Navy heading
- Muted description
- Small blue "Learn More" link

Suggested card CSS:

```css
.service-card {
  background: white;
  border: 1px solid #DCEAF1;
  border-radius: 8px;
  padding: 32px 24px;
  text-align: center;
}
```

---

## 13. About Section

Reference style:

- Large image on the left
- Text content on the right
- Small uppercase label
- Serif heading
- Paragraph
- Checklist
- Secondary CTA

### Layout

Desktop:

```text
[Clinic/Dentist image]  [About content]
```

Mobile:

```text
[Image]
[About content]
```

### Label

```text
ABOUT US
```

### Heading

```text
Your Smile is Our Top Priority
```

### Checklist Items

Use blue circular check icons.

Example:

```text
Experienced and caring dental team
Modern dental technology
Comfortable and welcoming environment
Patient comfort comes first
```

### CTA

```text
Learn More About Us
```

---

## 14. Why Choose Us Section

Reference style:

- Pale blue background
- Centered label
- Five horizontal icon items
- Thin vertical dividers
- Short descriptions

### Background

```css
background: #F4FAFD;
```

### Label

```text
WHY CHOOSE US
```

### Items

Recommended:

```text
Patient-Focused Care
Safe & Gentle Treatment
Modern Technology
Flexible Scheduling
Affordable Care
```

### Style

Each item:

- Blue outline icon
- Bold navy title
- Short gray description
- Center aligned

---

## 15. Available Schedule Section

This is a custom section for our project and should match the overall reference style.

### Purpose

Show available appointment times pulled from Google Calendar availability.

Visitors must understand that availability is for viewing only and that booking requires calling the clinic.

### Section Placement

Place after `Why Choose Us` or after `Services`.

Recommended placement:

```text
Hero
Services
About
Why Choose Us
Available Schedule
Find My Appointment
Testimonials
CTA
Footer
```

### Section Background

Use white or light blue.

Recommended:

```css
background: #FFFFFF;
```

or

```css
background: #F4FAFD;
```

### Section Label

```text
AVAILABLE SCHEDULES
```

### Heading

```text
View Available Appointment Times
```

### Supporting Text

```text
Check our available clinic schedules below. To reserve a time, please call the clinic and our staff will assist you.
```

### UI Layout

Desktop suggestion:

```text
Left:
- Date selector
- Available time slots
- Loading/error states

Right:
- Call-to-book card
- Clinic phone
- Clinic hours
- Reminder that booking is by phone
```

### Example UI

```text
Available Appointment Times

[ Today ] [ Tomorrow ] [ Sep 3 ] [ Sep 4 ]

Tuesday, September 1

[ 9:00 AM ] [ 9:30 AM ] [ 10:30 AM ]
[ 1:00 PM ] [ 2:30 PM ] [ 3:00 PM ]

Appointments are scheduled by phone.
Please call the clinic to reserve your preferred time.

[ Call Clinic ]
```

### Time Slot Style

Slots should look selectable but not like instant booking.

Better labels:

```text
9:00 AM
Available
```

or:

```text
9:00 AM
Call to reserve
```

Avoid:

```text
Book
Confirm
Reserve Now
```

### Empty State

```text
No available times are currently shown for this date.
Please call the clinic for assistance.
```

### Error State

```text
Schedule information is temporarily unavailable.
Please call the clinic for current availability.
```

---

## 16. Find My Appointment Section

This section is also custom for our project.

### Purpose

Allow patients to search for current or future appointments using the phone number used during booking.

### Section Label

```text
FIND MY APPOINTMENT
```

### Heading

```text
Check Your Upcoming Visit
```

### Supporting Text

```text
Enter the phone number you used when booking to view your current or upcoming appointment.
```

### Form Fields

MVP:

```text
Phone number
```

Future privacy improvement:

```text
Phone number
Last name
```

### Result Card

Only show safe information.

Allowed:

```text
Date
Start time
End time
Service
```

Do not show:

```text
Patient name
Phone number
Calendar description
Notes
Email
Private details
```

### Example Result

```text
Upcoming Appointment

Tuesday, September 1
10:00 AM – 10:30 AM
Dental Cleaning

Need to reschedule?
Please call the clinic.
```

### Not Found State

```text
No upcoming appointment was found with the information provided.
Please check the phone number or contact the clinic.
```

### Privacy Note

Add small muted helper text:

```text
For privacy, only current and future appointments are shown.
```

---

## 17. Testimonials Section

Reference style:

- White background
- Centered section label
- Serif heading
- Three testimonial cards
- Quote icon
- Star rating
- Patient avatar
- Name and location

### Label

```text
WHAT OUR PATIENTS SAY
```

### Heading

```text
Trusted by Hundreds of Happy Smiles
```

### Card Style

- White background
- Light border
- Subtle shadow
- Quote icon in blue
- Star icons in gold
- Small circular avatar
- Patient name bold
- Location muted

### Sample Testimonials

Use placeholder content until real testimonials are available.

```text
The staff made me feel comfortable from the moment I walked in.
```

```text
Excellent care and professional service. The clinic is clean and welcoming.
```

```text
My dental visit was smooth and stress-free. Highly recommended.
```

---

## 18. CTA Banner

Reference style:

- Full-width dark blue gradient/banner
- Left icon
- Strong white heading
- Supporting text
- White CTA button
- Contact details on right
- Tooth image/decoration optional

### Background

Use deep navy with blue overlay.

```css
background: linear-gradient(90deg, #063052, #0E6792);
```

### Heading

```text
Ready for a Healthier Smile?
```

### Text

```text
View our available schedules, then call our clinic to book your visit.
```

### CTA

```text
View Available Times
```

Secondary contact info:

```text
Phone: 0969 519 5316
Email: horcabasclinic@gmail.com
```

---

## 19. Footer

Reference style:

- Deep navy background
- Multi-column footer
- Logo and clinic description
- Quick links
- Services
- Patient links
- Contact info
- Social icons
- Bottom copyright row

### Footer Columns

Recommended:

```text
Column 1:
Logo
Short clinic description
Social icons

Column 2:
Quick Links
Home
About Us
Services
Schedule
Find My Appointment
Contact

Column 3:
Our Services
General Dentistry
Cleaning
Tooth Extraction
Teeth Whitening
Dental Fillings

Column 4:
Patients
Available Schedules
Find My Appointment
FAQs
Call to Book

Column 5:
Contact Us
Address
Phone
Email
Clinic hours
```

### Bottom Row

```text
© 2026 Horcabas Dental Clinic. All rights reserved.
Privacy Policy | Terms of Service
```

---

## 20. Icons

Use thin outline icons similar to the reference.

Recommended icon style:

- Stroke icons
- Rounded line caps
- Dental/medical theme
- Primary blue color
- Consistent stroke width

Recommended icon categories:

```text
Tooth
Calendar
Phone
Location pin
Clock
Shield
Heart
Users
Smile
Check circle
Star
Quote
Mail
```

Possible icon libraries:

```text
lucide-react
react-icons
```

Prefer one icon library for consistency.

---

## 21. Imagery

The reference uses bright, professional clinic/patient imagery.

Recommended image types:

- Smiling patient in dental chair
- Dentist with patient
- Dental team photo
- Clean clinic interior
- Dental tools/equipment
- Tooth illustration for CTA/footer accents

Image style:

- Bright lighting
- Blue/white tones
- Clean clinical environment
- Friendly expressions
- Professional quality
- Rounded corners for inline images

Avoid:

- Dark clinical imagery
- Scary dental equipment closeups
- Graphic dental treatment imagery
- Overly stocky/unrealistic images where possible

---

## 22. Forms

Forms should be simple, clean, and accessible.

### Input Style

```css
.input {
  border: 1px solid #DCEAF1;
  border-radius: 8px;
  padding: 14px 16px;
  color: #0B2F4A;
}
```

### Focus State

```css
.input:focus {
  border-color: #1598C7;
  box-shadow: 0 0 0 3px rgba(21, 152, 199, 0.15);
}
```

### Form Labels

Use clear labels.

Example:

```text
Phone number
```

Do not rely only on placeholders.

---

## 23. Responsive Behavior

### Desktop

- Full top bar
- Horizontal navbar
- Two-column hero
- Five-card service grid
- Two-column about section
- Multi-column footer

### Tablet

- Navbar may collapse if needed
- Service cards 2 or 3 per row
- Hero can remain two-column if enough space

### Mobile

- Top bar simplified
- Hamburger menu
- Hero text first, image second
- Full-width buttons
- Service cards stacked
- Schedule slots in 2-column grid
- Appointment search full-width
- Footer columns stacked

Mobile call button should use:

```html
<a href="tel:+639695195316">Call Clinic</a>
```

---

## 24. Accessibility

Design and implementation should support:

- Sufficient color contrast
- Keyboard navigation
- Visible focus states
- Semantic headings
- Proper button/link usage
- Form labels
- Alt text for meaningful images
- Avoiding text embedded in images
- Large enough tap targets on mobile

Minimum tap target:

```text
44px x 44px
```

---

## 25. Content Tone

Use friendly, reassuring language.

Good tone:

```text
Gentle care for your whole family.
```

```text
Please call our clinic to reserve your preferred schedule.
```

```text
Our team will help you find the best available time.
```

Avoid overly aggressive sales language:

```text
Limited slots! Book now!
```

Avoid implying online booking:

```text
Reserve your slot instantly.
```

---

## 26. Recommended Page Copy

### Hero

```text
HEALTHY SMILE. HEALTHY YOU.

Exceptional Dental Care for the Whole Family

We provide modern, gentle dental care in a comfortable environment for patients of all ages.

[View Available Times] [Our Services]
```

### Schedule Section

```text
AVAILABLE SCHEDULES

View Available Appointment Times

Check our current available clinic schedules below. To reserve a time, please call the clinic and our staff will assist you.

Appointments shown are subject to confirmation by phone.
```

### Find Appointment Section

```text
FIND MY APPOINTMENT

Check Your Upcoming Visit

Enter the phone number used when booking to view your current or upcoming appointment.
```

### CTA Banner

```text
Ready for a Healthier Smile?

View available schedules and call our clinic to book your visit today.
```

---

## 27. Tailwind Theme Suggestion

If using Tailwind CSS, extend the theme with project tokens.

Example:

```ts
const theme = {
  colors: {
    navy: "#062B49",
    "deep-navy": "#04243D",
    dental: {
      blue: "#1598C7",
      hover: "#0F83AD",
      light: "#EAF6FB",
      pale: "#F4FAFD",
    },
    body: "#465A66",
    muted: "#6B7C87",
    border: "#DCEAF1",
  },
  fontFamily: {
    heading: ["Playfair Display", "Georgia", "serif"],
    sans: ["Inter", "system-ui", "sans-serif"],
  },
};
```

---

## 28. Component Design Checklist

### Navbar

- [ ] Logo on left
- [ ] Nav links centered/right
- [ ] Call-to-book CTA
- [ ] Mobile menu
- [ ] Active link state

### Hero

- [ ] Light blue background
- [ ] Serif headline
- [ ] Primary and secondary CTA
- [ ] Dental/patient image
- [ ] Trust feature strip

### Services

- [ ] Section label
- [ ] Serif heading
- [ ] Service cards
- [ ] Dental icons
- [ ] Hover states

### Available Schedule

- [ ] Date selector
- [ ] Available slots
- [ ] Loading state
- [ ] Empty state
- [ ] Error state
- [ ] Call-to-book message
- [ ] Phone CTA

### Find My Appointment

- [ ] Phone input
- [ ] Search button
- [ ] Validation
- [ ] Loading state
- [ ] Not-found state
- [ ] Sanitized result card
- [ ] Privacy helper text

### Footer

- [ ] Logo
- [ ] Description
- [ ] Quick links
- [ ] Services
- [ ] Patient links
- [ ] Contact information
- [ ] Copyright row

---

## 29. Design Principles for Agents

When implementing this design, coding agents should:

1. Match the reference's blue/white dental-care feel.
2. Keep the page polished and spacious.
3. Use serif headings and sans-serif body text.
4. Keep CTAs aligned with the call-to-book workflow.
5. Never make users think they can book online.
6. Make schedule availability easy to scan.
7. Keep appointment search private and minimal.
8. Preserve responsive behavior.
9. Avoid clutter.
10. Use consistent icons, spacing, colors, and border radii.

---

## 30. Definition of Visual Done

The design implementation is acceptable when:

- The landing page visually resembles the provided dental reference.
- The hero feels premium and professional.
- The color palette is consistently blue, navy, white, and light blue.
- Headings use an elegant serif style.
- Body text is readable and clean.
- Services are shown as dental icon cards.
- The schedule section clearly shows availability but instructs users to call.
- The appointment search section feels integrated, not like a separate app.
- The footer is complete and information-rich.
- The site works well on desktop, tablet, and mobile.
