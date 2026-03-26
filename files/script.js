/* ============================================
   Satyasheel Gautam — Portfolio JavaScript
   ============================================ */

// ─── Set Current Year ───
document.getElementById('year').textContent = new Date().getFullYear();

// ─── Navbar Scroll Effect ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── Mobile Menu Toggle ───
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

// ─── Typewriter Effect ───
const roles = ["Digital Marketer", "Web Developer", "SEO Expert", "BCA Student", "Creative Thinker"];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
    const role = roles[ri];
    tw.textContent = deleting ? role.substring(0, ci - 1) : role.substring(0, ci + 1);
    deleting ? ci-- : ci++;

    if (!deleting && ci === role.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
    }
    if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(type, 500);
        return;
    }
    setTimeout(type, deleting ? 45 : 90);
}
setTimeout(type, 800);

// ─── Scroll Reveal Animation ───
const reveals = document.querySelectorAll('.reveal');
const onScroll = () => {
    const wh = window.innerHeight;
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < wh - 80) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', onScroll);
onScroll(); // Run once on load

// ─── Contact Form AJAX Submission ───
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (form.action.includes('YOUR_FORMSPREE_URL_HERE')) {
        formStatus.textContent = "Please set your Formspree API URL first!";
        formStatus.className = "mt-4 text-sm font-medium text-red-400 block";
        return;
    }

    const orig = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ml-2"></i>';
    submitBtn.disabled = true;

    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        });

        if (res.ok) {
            formStatus.textContent = "Thanks! Message sent successfully.";
            formStatus.className = "mt-4 text-sm font-medium text-emerald-400 block";
            form.reset();
        } else {
            formStatus.textContent = "Oops! Problem sending message.";
            formStatus.className = "mt-4 text-sm font-medium text-red-400 block";
        }
    } catch {
        formStatus.textContent = "Error! Check your internet connection.";
        formStatus.className = "mt-4 text-sm font-medium text-red-400 block";
    }

    submitBtn.innerHTML = orig;
    submitBtn.disabled = false;
    setTimeout(() => formStatus.classList.add('hidden'), 5000);
});

// ─── Three.js Particles Background ───
const canvas = document.getElementById('bg-canvas');
if (canvas && window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const geo = new THREE.BufferGeometry();
    const count = 600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 20;
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
        size: 0.012,
        color: 0x10b981,
        transparent: true,
        opacity: 0.5
    });

    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);
    camera.position.z = 5;

    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
        mx = e.clientX - innerWidth / 2;
        my = e.clientY - innerHeight / 2;
    });

    (function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.001;
        mesh.rotation.x += 0.0005;
        mesh.rotation.x += my * 0.000008;
        mesh.rotation.y += mx * 0.000008;
        renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
    });
}

// ─── Profile Image (Optional) ───
// Apni photo use karne ke liye yeh line uncomment karein:
// document.getElementById('profile-img').src = 'your-photo.jpg';
