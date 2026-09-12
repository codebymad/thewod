import { useMemo } from 'react';
import { Paper, Typography } from "@mui/material";

function QuoteOfTheDay() {
    const randomQuote = useMemo(() => {
        const index = Math.floor(Math.random() * quotes.length);
        return quotes[index];
    }, []);

    return (
        <Paper sx={{ p: 2, backgroundColor: 'background.paper' }}>
            {/* <Typography variant="h2" color="secondary"> Quote </Typography> */}
            <Typography variant="body1">
                "{randomQuote}"
            </Typography>
        </Paper>
    )
}


const quotes = [
    "Your workout won't fix everything in your life, but it will absolutely make you too tired to care about the small stuff.",
    "Some days you feel unstoppable, and some days you feel like the barbell personally hates you — both days count.",
    "Sweat is your body's way of filing a complaint about your decisions, but progress is its way of thanking you later.",
    "If you still look cute after your workout, you didn't try hard enough — go back and make it questionable.",
    "Your future self is watching you right now, whispering, 'Please don't skip the warm-up again.'",
    "Exercise is basically telling your body, 'I know you're comfortable, but we're doing this anyway.'",
    "You don't need to be perfect — just better than the version of you who wanted to stay on the couch.",
    "If you think lifting is hard, try lifting your mood without it — the gym is cheaper than therapy.",
    "Your legs might complain, but your goals won't — keep moving.",
    "Every rep is a tiny negotiation between you and your excuses. Don't let excuses win the contract.",
    "You're not tired — you're just upgrading your operating system.",
    "The only thing heavier than the barbell is the regret of skipping your workout.",
    "Your workout is basically a daily meeting with your future self. Don't show up late.",
    "If you can survive burpees, you can survive anything — including your inbox.",
    "Your muscles don't grow from comfort; they grow from politely suffering.",
    "You don't need motivation every day — you just need to remember why you started.",
    "Sweat is your body's way of saying, 'Fine, I'll change.'",
    "Your workout won't solve everything, but it will make everything feel more solvable.",
    "If you're waiting for the perfect moment to start, it's now — the universe said so.",
    "Your comfort zone called. It said it's getting lonely without you.",
    "You're not chasing perfection; you're chasing progress — perfection is slow anyway.",
    "The hardest part of the workout is putting on your shoes. After that, you're unstoppable.",
    "Your body is capable of more than your brain believes — prove your brain wrong.",
    "If you quit now, you'll be right back where you started… except more annoyed.",
    "Your workout is the one meeting today where you can show up sweaty and still be productive.",
    "You don't need to be the strongest — just strong enough to keep going.",
    "Your goals don't care about your mood — but they love your effort.",
    "If you're not struggling a little, you're not growing at all.",
    "Your workout is basically adult recess — enjoy it before life emails you again.",
    "You're not slow — you're just warming up your greatness.",
    "Your muscles are listening. Tell them something inspiring.",
    "If you think you can't, do one rep. If you still think you can't, do another.",
    "Your workout is your daily reminder that you can do hard things — even before coffee.",
    "You don't need a perfect plan — you need a stubborn attitude.",
    "Your strength doesn't come from what you can do; it comes from what you thought you couldn't.",
    "If you're sweating, you're winning — that's the rule.",
    "Your workout is the plot twist your day needed.",
    "You're not tired — you're just becoming legendary.",
    "Your excuses are cute, but your goals are cuter.",
    "If you can push through the last minute of a workout, you can push through anything.",
    "Your workout is your daily rebellion against comfort.",
    "You're not weak — you're just early in the process.",
    "Your body won't change overnight, but your mindset can change today.",
    "If you're waiting for a sign to work out, this is it — neon, flashing, loud.",
    "Your workout is the only place where suffering feels productive.",
    "You're not chasing a look — you're chasing a lifestyle.",
    "Your strength is built in the moments you want to stop but don't.",
    "If you can laugh during your workout, you're doing it right — or you're delirious.",
    "Your workout is the one thing today that's fully under your control — own it.",
    "You don't need to be fast; you just need to be determined enough to finish.",
    "Your workout is the daily reminder that you're capable of more than you think.",
    "If your muscles are screaming, it means they care.",
    "Your workout doesn't need to be perfect — it just needs to exist.",
    "You're not tired — you're just negotiating greatness.",
    "Your workout is the only drama you need in your life.",
    "If you can lift your spirits, you can lift the weights.",
    "Your workout is your daily vote for the person you want to become.",
    "You're not slow — you're just building character.",
    "Your workout is the one place where quitting early is optional but regrettable.",
    "If you're sweating, you're succeeding — even if you're also questioning your life choices.",
    "Your workout is your daily reminder that comfort is overrated.",
    "You're not weak — you're just warming up your potential.",
    "Your workout is the only appointment you should never cancel.",
    "If you can push through the burn, you can push through anything life throws at you.",
    "Your workout is your daily dose of 'I can do this.'",
    "You're not tired — you're transforming.",
    "Your workout is the one thing today that won't lie to you.",
    "If you're breathing hard, you're working hard — keep going.",
    "Your workout is your daily reminder that you're stronger than your excuses.",
    "You're not slow — you're just pacing your greatness.",
    "Your workout is the only place where suffering feels like progress.",
    "If you can finish the workout, you can finish the day.",
    "Your workout is your daily investment in future strength.",
    "You're not tired — you're leveling up.",
    "Your workout is the one thing today that guarantees growth.",
    "If you're sweating, you're rewriting your limits.",
    "Your workout is your daily reminder that you're capable of greatness.",
    "You're not slow — you're just building resilience.",
    "Your workout is the only place where effort always pays off.",
    "If you can push through the last rep, you can push through anything.",
    "Your workout is your daily reminder that you're stronger than you think.",
    "You're not tired — you're becoming unstoppable.",
    "Your workout is the one thing today that makes you better tomorrow.",
    "If you're sweating, you're succeeding — keep going.",
    "Your workout is your daily reminder that progress is earned.",
    "You're not slow — you're just mastering consistency.",
    "Your workout is the only place where quitting is optional but never recommended.",
    "If you can finish the workout, you can finish the week.",
    "Your workout is your daily reminder that strength is built, not given.",
    "You're not tired — you're evolving.",
    "Your workout is the one thing today that proves you can do hard things.",
    "If you're sweating, you're winning — even if you're also questioning your sanity.",
    "Your workout is your daily reminder that effort beats excuses.",
    "You're not slow — you're just building endurance.",
    "Your workout is the only place where discomfort equals growth.",
    "If you can push through the burn, you can push through anything.",
    "Your workout is your daily reminder that you're capable of more.",
    "You're not tired — you're becoming extraordinary.",
    "Your workout is the one thing today that guarantees progress.",
    "If you're sweating, you're rewriting your story.",
    "Your workout is your daily reminder that strength is a choice.",
    "You're not slow — you're just building power.",
    "Your workout is the only place where effort always wins.",
    "If you can finish the workout, you can finish anything."
]

export default QuoteOfTheDay;