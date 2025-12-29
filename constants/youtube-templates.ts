export type TitleCategory = "tutorial" | "listicle" | "story" | "clickbait" | "negative" | "comparison" | "question";

interface Template {
    titlePattern: string;
    descPattern: string;
    score: number; // 0-100 (Viral Score)
}

export const TITLE_TEMPLATES: Record<TitleCategory, Template[]> = {
    tutorial: [
        {
            titlePattern: "How to Master {topic} in [Number] Minutes",
            descPattern: "Want to learn {topic} fast? In this video, I break down exactly how to master {topic} in just [Number] minutes with step-by-step instructions.",
            score: 94
        },
        {
            titlePattern: "The Ultimate Guide to {topic} (2025 Edition)",
            descPattern: "This is the most complete guide to {topic} on the internet. Updated for 2025, we cover everything from basics to advanced strategies.",
            score: 90
        },
        {
            titlePattern: "{topic} for Beginners: Start Here",
            descPattern: "If you are new to {topic}, this is the video for you. I explain the fundamentals of {topic} in simple terms so you can get started today.",
            score: 92
        },
        {
            titlePattern: "Stop Doing {topic} Wrong! (Do This Instead)",
            descPattern: "Most people fail at {topic} because of this one mistake. Watch this video to learn the correct way to handle {topic} and save yourself time.",
            score: 96
        },
        {
            titlePattern: "How I Learned {topic} in Just 7 Days",
            descPattern: "Is it possible to learn {topic} in a week? I documented my journey of learning {topic} from scratch in just 7 days. Here is my roadmap.",
            score: 95
        },
        {
            titlePattern: "{topic} Tutorial: From Zero to Hero",
            descPattern: "Go from knowing nothing to becoming a pro at {topic}. This comprehensive tutorial covers every single detail you need to succeed.",
            score: 88
        },
        {
            titlePattern: "The Easiest Way to {topic} (Step-by-Step)",
            descPattern: "Don't overcomplicate {topic}. I found the easiest, laziest way to get results with {topic} without the stress. Follow my steps.",
            score: 91
        },
        {
            titlePattern: "Master {topic} While You Sleep",
            descPattern: "Imagine mastering {topic} with minimal effort. In this video, I share productivity hacks and tools that automate your {topic} workflow.",
            score: 85
        },
        {
            titlePattern: "I Wish I Knew This About {topic} Sooner",
            descPattern: "If I could go back in time, I would tell myself these tips about {topic}. Watch this to avoid the years of struggle I went through.",
            score: 93
        },
        {
            titlePattern: "Complete {topic} Bootcamp (Free Course)",
            descPattern: "Why pay for courses? This video is a full, free bootcamp on {topic}. Get your notebook ready because we are diving deep.",
            score: 89
        },
    ],
    listicle: [
        {
            titlePattern: "[Number] {topic} Secrets Professionals Hide",
            descPattern: "Industry experts don't want you to know these [Number] secrets about {topic}. I'm exposing the truth to help you get ahead.",
            score: 97
        },
        {
            titlePattern: "Top [Number] {topic} Tools You Need in 2025",
            descPattern: "I tested dozens of apps. Here are the top [Number] {topic} tools that are actually worth your money in 2025.",
            score: 91
        },
        {
            titlePattern: "[Number] Reasons Why {topic} is the Future",
            descPattern: "{topic} is taking over. Here are [Number] undeniable reasons why {topic} is the future and why you need to adapt now.",
            score: 89
        },
        {
            titlePattern: "I Ranked Every {topic} (Tier List)",
            descPattern: "Which {topic} is the best? I ranked every single option in a Tier List from S-Tier to F-Tier. See where your favorite lands.",
            score: 94
        },
        {
            titlePattern: "[Number] Signs You Are a {topic} Genius",
            descPattern: "Do you have what it takes? If you show these [Number] signs, you might just be a natural genius at {topic}.",
            score: 88
        },
        {
            titlePattern: "[Number] {topic} Hacks That Feel Illegal",
            descPattern: "These {topic} hacks are so good they feel illegal to know. Boost your efficiency instantly with these [Number] tricks.",
            score: 98
        },
        {
            titlePattern: "The [Number] Best {topic} Tips of All Time",
            descPattern: "I compiled the greatest advice ever given on {topic}. Here are the [Number] best tips that stand the test of time.",
            score: 90
        },
        {
            titlePattern: "[Number] Things I Learned from {topic}",
            descPattern: "After years of experience, here are the [Number] most important lessons I learned from {topic} that changed my perspective.",
            score: 87
        },
        {
            titlePattern: "[Number] Ways to Make Money with {topic}",
            descPattern: "Want to monetize {topic}? Here are [Number] proven business models and strategies to make serious money with {topic}.",
            score: 95
        },
        {
            titlePattern: "[Number] Rules for Success in {topic}",
            descPattern: "Success leaves clues. Follow these [Number] strict rules if you want to become successful in the world of {topic}.",
            score: 92
        },
    ],
    story: [
        {
            titlePattern: "I Tried {topic} for 30 Days - Here's What Happened",
            descPattern: "I challenged myself to do {topic} for 30 days straight without breaks. The results were absolutely shocking. Watch the full journey.",
            score: 96
        },
        {
            titlePattern: "Why I Quit {topic} (And You Should Too)",
            descPattern: "I used to love {topic}, but I had to quit. In this video, I explain the toxic side of {topic} and why you might want to stop too.",
            score: 95
        },
        {
            titlePattern: "The Truth About {topic} No One Talks About",
            descPattern: "There is a secret side to {topic} that influencers ignore. I'm revealing the brutal truth about what it's really like.",
            score: 93
        },
        {
            titlePattern: "I Built a {topic} Empire from Scratch",
            descPattern: "Starting with $0, I built a massive {topic} business. This is the story of my failures, successes, and lessons learned.",
            score: 91
        },
        {
            titlePattern: "How {topic} Changed My Life Forever",
            descPattern: "{topic} isn't just a hobby, it saved my life. Here is the emotional story of how discovering {topic} changed everything for me.",
            score: 90
        },
        {
            titlePattern: "The Day {topic} Ruined Everything",
            descPattern: "It started as a normal day, until {topic} went horribly wrong. This is a cautionary tale you need to hear.",
            score: 97
        },
        {
            titlePattern: "My Honest Experience with {topic}",
            descPattern: "No filters, no scripts. Just me talking about my real, raw experience with {topic} over the last few years.",
            score: 88
        },
        {
            titlePattern: "I Lost Everything Because of {topic}...",
            descPattern: "I made a huge mistake with {topic} and it cost me everything. Don't make the same error I did. Watch this warning.",
            score: 99
        },
        {
            titlePattern: "A Day in the Life of a {topic} Expert",
            descPattern: "Ever wondered what it's like to work in {topic}? Come spend a day with me as I navigate the challenges of being a pro.",
            score: 85
        },
        {
            titlePattern: "The Secret History of {topic}",
            descPattern: "You think you know {topic}, but you don't know the whole story. We are diving into the weird and fascinating history of {topic}.",
            score: 89
        },
    ],
    clickbait: [
        {
            titlePattern: "Is {topic} Dead?",
            descPattern: "Everyone is claiming {topic} is over. Is it true? I looked at the data and the answer is not what you think.",
            score: 98
        },
        {
            titlePattern: "Don't Buy {topic} Until You Watch This",
            descPattern: "Thinking of buying {topic}? STOP! There is a huge problem you need to know about before you spend a single dollar.",
            score: 96
        },
        {
            titlePattern: "The End of {topic}?",
            descPattern: "With recent updates, it looks like the end for {topic}. Let's analyze if this is really the final nail in the coffin.",
            score: 95
        },
        {
            titlePattern: "Why Everyone is Wrong About {topic}",
            descPattern: "The common advice on {topic} is actually garbage. In this video, I debunk the biggest myths everyone believes.",
            score: 94
        },
        {
            titlePattern: "This Changes Everything for {topic}",
            descPattern: "A massive update just dropped for {topic} and it changes the game completely. Here is what you need to know.",
            score: 97
        },
        {
            titlePattern: "They Don't Want You to Know This About {topic}",
            descPattern: "There is a secret about {topic} that is being kept from you. I'm blowing the whistle and revealing it all today.",
            score: 99
        },
        {
            titlePattern: "I Found a Secret {topic} Glitch!",
            descPattern: "I discovered a broken mechanic in {topic} that gives you an unfair advantage. Use this before it gets patched!",
            score: 92
        },
        {
            titlePattern: "Is {topic} a Scam? (Investigation)",
            descPattern: "We investigated {topic} to see if it's legit or a total scam. The evidence we found is disturbing.",
            score: 96
        },
        {
            titlePattern: "Delete Your {topic} NOW!",
            descPattern: "If you have {topic} installed, delete it immediately. Here is why it poses a huge risk to your security/productivity.",
            score: 98
        },
        {
            titlePattern: "The Scary Truth About {topic}",
            descPattern: "Warning: This video contains uncomfortable truths about {topic}. Viewer discretion is advised.",
            score: 93
        },
    ],
    negative: [
        {
            titlePattern: "Why {topic} is a Waste of Time",
            descPattern: "Unpopular opinion: {topic} is not worth your time. Here is why you should avoid {topic} and what you should focus on instead.",
            score: 92
        },
        {
            titlePattern: "Stop Wasting Money on {topic}",
            descPattern: "You are throwing money away! {topic} is a bad investment. Here is the math on why it's a financial trap.",
            score: 94
        },
        {
            titlePattern: "The Dark Side of {topic}",
            descPattern: "{topic} seems perfect on the surface, but there is a dark side. I'm revealing the uncomfortable truth about {topic}.",
            score: 95
        },
        {
            titlePattern: "Why I Hate {topic} (Rant)",
            descPattern: "I've held this back for too long. I absolutely hate {topic} and in this video, I'm going to tell you exactly why.",
            score: 89
        },
        {
            titlePattern: "[Number] Mistakes That Kill Your {topic} Success",
            descPattern: "If you are doing these [Number] things, you are destroying your chances with {topic}. Fix these mistakes now.",
            score: 96
        },
        {
            titlePattern: "Why {topic} Will Fail in 2025",
            descPattern: "The trends don't look good. Here is my prediction on why {topic} is going to crash and burn in 2025.",
            score: 91
        },
        {
            titlePattern: "The Problem with {topic}",
            descPattern: "We need to talk about the massive problem with {topic} that nobody is addressing. It's time for a change.",
            score: 88
        },
        {
            titlePattern: "Avoid {topic} at All Costs!",
            descPattern: "Whatever you do, do not touch {topic}. It is a trap. Here is my warning to anyone considering it.",
            score: 93
        },
        {
            titlePattern: "Why Pros Are Leaving {topic}",
            descPattern: "Top professionals are abandoning {topic} in droves. Where are they going? And why are they leaving? Let's find out.",
            score: 90
        },
        {
            titlePattern: "Don't Fall for the {topic} Hype",
            descPattern: "The marketing for {topic} is great, but the reality is disappointing. Don't believe the hype - watch this review.",
            score: 92
        },
    ],
    comparison: [
        {
            titlePattern: "{topic} vs The Competition: Which is Best?",
            descPattern: "I compared {topic} against its biggest competitors side-by-side. Which one comes out on top? Watch this full comparison.",
            score: 91
        },
        {
            titlePattern: "{topic} Review: Worth the Hype?",
            descPattern: "Is {topic} actually good or just all hype? I tested it thoroughly so you don't have to. Here is my honest review.",
            score: 93
        },
        {
            titlePattern: "Why I Switched to {topic}",
            descPattern: "I used to use the competitor, but I switched to {topic}. Here are the main reasons why I made the jump.",
            score: 94
        },
        {
            titlePattern: "{topic}: Buy or Pass?",
            descPattern: "Should you spend your money on {topic}? I break down the pros and cons to help you decide: Buy or Pass?",
            score: 89
        },
        {
            titlePattern: "The Best Alternative to {topic}",
            descPattern: "Looking for something better than {topic}? I found the perfect alternative that is cheaper and faster.",
            score: 90
        },
        {
            titlePattern: "{topic} vs [Competitor] - The Final Verdict",
            descPattern: "The battle of the century: {topic} vs [Competitor]. After weeks of testing, I finally have a winner.",
            score: 92
        },
        {
            titlePattern: "Cheap vs Expensive {topic}",
            descPattern: "Is the expensive {topic} really worth 10x the price? I bought both to see if you can save money.",
            score: 95
        },
        {
            titlePattern: "Is {topic} Better Than [Competitor]?",
            descPattern: "Everyone asks this question. Today, we finally answer: Is {topic} actually better than [Competitor]?",
            score: 91
        },
        {
            titlePattern: "{topic} Full Comparison (2025)",
            descPattern: "This is the most in-depth comparison of {topic} on YouTube. We look at specs, performance, price, and value.",
            score: 88
        },
        {
            titlePattern: "Don't Choose {topic} Before Watching This",
            descPattern: "You might be choosing the wrong option. Watch this comparison of {topic} to make sure you make the right choice.",
            score: 94
        },
    ],
    question: [
        {
            titlePattern: "What is {topic} Really?",
            descPattern: "You've heard the term, but do you know what {topic} actually is? I explain the concept simply and clearly.",
            score: 87
        },
        {
            titlePattern: "Can You Really Make Money with {topic}?",
            descPattern: "Is it a scam or a goldmine? I tried to make money with {topic} and here are my real results.",
            score: 95
        },
        {
            titlePattern: "Is {topic} Worth It in 2025?",
            descPattern: "With everything changing, is {topic} still relevant in 2025? Let's analyze the pros and cons.",
            score: 92
        },
        {
            titlePattern: "How Does {topic} Actually Work?",
            descPattern: "We are looking under the hood. Here is a deep dive into the mechanics of how {topic} actually functions.",
            score: 89
        },
        {
            titlePattern: "Who is {topic} For?",
            descPattern: "{topic} isn't for everyone. Watch this to see if you fit the profile of someone who needs {topic}.",
            score: 85
        },
        {
            titlePattern: "Does {topic} Really Work?",
            descPattern: "I put {topic} to the test to answer the ultimate question: Does it actually work as advertised?",
            score: 93
        },
        {
            titlePattern: "Where to Start with {topic}?",
            descPattern: "Overwhelmed by {topic}? I'll show you exactly where to start, step-by-step, with zero confusion.",
            score: 88
        },
        {
            titlePattern: "Why is {topic} So Popular?",
            descPattern: "Everyone is talking about {topic}. But why? We explore the psychology and trends behind its massive popularity.",
            score: 90
        },
        {
            titlePattern: "Can {topic} Make You Rich?",
            descPattern: "We analyze the financial potential of {topic}. Can it really make you a millionaire or is it a pipe dream?",
            score: 96
        },
        {
            titlePattern: "What Happens If You Quit {topic}?",
            descPattern: "Thinking of stopping? Here is what happens to your body/business/life when you quit {topic} cold turkey.",
            score: 94
        },
    ]
};

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};