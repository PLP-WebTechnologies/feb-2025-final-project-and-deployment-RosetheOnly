const testimonials = [
    {
        id: 1,
        content: "The wireless headphones are absolutely amazing! The noise cancellation is the best I've ever experienced, and the sound quality is exceptional.",
        author: "Sarah Johnson",
        role: "Audio Enthusiast",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        rating: 5
    },
    {
        id: 2,
        content: "I've been using the Pro Smart Watch for 3 months now and it's completely changed how I track my fitness. The battery life is impressive and the GPS is very accurate.",
        author: "Michael Chen",
        role: "Fitness Trainer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        rating: 4
    },
    {
        id: 3,
        content: "As a professional photographer, I'm extremely impressed with the 4K DSLR Camera. The image quality is stunning and the stabilization makes handheld shots look like they were taken with a tripod.",
        author: "Emma Rodriguez",
        role: "Professional Photographer",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
        rating: 5
    }
];

export function initTestimonials() {
    const container = document.getElementById('testimonials-container');
    
    if (!container) return;
    
    container.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card" role="listitem">
            <div class="testimonial-content">
                <p>"${testimonial.content}"</p>
            </div>
            <div class="testimonial-author">
                <img src="${testimonial.avatar}" alt="${testimonial.author}" class="testimonial-avatar">
                <div class="testimonial-author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}
// ...existing code...
if (document.getElementById('testimonials-container')) {
    initTestimonials();
}
