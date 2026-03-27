import { useState, useRef, useCallback, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// ⚡  POWER LEVEL SYSTEM
// ═══════════════════════════════════════════════════════════════
const LEVELS = {
  starter: {
    id:"starter", name:"Starter", tagline:"Solo Chef Mode",
    icon:"⭐", color:"#16a34a", bg:"#f0fdf4", border:"#86efac",
    glow:"0 0 18px rgba(22,163,74,0.25)", badge:"Solo Star ⭐",
    desc:"No fire, no fuss — you've totally got this!",
  },
  explorer: {
    id:"explorer", name:"Explorer", tagline:"Buddy Cook Mode",
    icon:"🔥", color:"#d97706", bg:"#fffbeb", border:"#fcd34d",
    glow:"0 0 18px rgba(217,119,6,0.25)", badge:"Flame Finder 🔥",
    desc:"A little heat — grab a buddy and go!",
  },
  boss: {
    id:"boss", name:"Chef Boss", tagline:"Adult On Deck",
    icon:"👑", color:"#dc2626", bg:"#fff1f2", border:"#fca5a5",
    glow:"0 0 18px rgba(220,38,38,0.2)", badge:"Boss Chef 👑",
    desc:"Real fire, real skills — adult needed!",
  },
  survival: {
    id:"survival", name:"Kitchen Survival", tagline:"College Mode 🎓",
    icon:"🎓", color:"#4f46e5", bg:"#eef2ff", border:"#a5b4fc",
    glow:"0 0 18px rgba(79,70,229,0.2)", badge:"Survival Pro 🎓",
    desc:"Budget meals for independent life!",
  },
};

// ═══════════════════════════════════════════════════════════════
// 🗄️  RECIPE DATABASE
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// 🎨  SHARED MICRO-STYLES — defined at top so all components can use them
// ═══════════════════════════════════════════════════════════════
const BK   = {background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#6b7280",marginBottom:14,padding:0,display:"block"};
const BTN  = {width:"100%",color:"white",border:"none",borderRadius:15,padding:"15px 0",fontSize:16,fontWeight:800,cursor:"pointer"};
const INP  = {width:"100%",padding:"13px 14px",borderRadius:12,border:"2px solid #e5e7eb",fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:14,fontFamily:"inherit",transition:"border-color 0.2s"};
const LB   = {display:"block",fontWeight:700,fontSize:13,color:"#292524",marginBottom:6};
const ER   = {color:"#ef4444",fontSize:12,marginTop:-10,marginBottom:10,display:"block"};
const CARD = {background:"white",borderRadius:20,padding:22,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"};

// ═══════════════════════════════════════════════════════════════
// 🗄️  FULLY AUDITED RECIPE DATABASE — ALL RECIPES WITH COMPLETE STEPS
//     Every step has: text (shown on screen) + speech (spoken aloud by chef)
//     Steps with safety:true trigger the grown-up gate
// ═══════════════════════════════════════════════════════════════
const RECIPES = [

  // ──────────────────────────────────────────────────────────────
  // ⭐  STARTER  ·  NO FLAME  ·  VEG
  // ──────────────────────────────────────────────────────────────
  {
    id:1, name:"Mango Popsicles", hindi:"आम की पॉप्सिकल", emoji:"🧊",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"10 mins + overnight freeze", badge:"Ice Royalty 🧊", tags:["summer","sweet"],
    desc:"Creamy frozen mango popsicles — blend, pour and freeze overnight!",
    ingredients:["2 ripe mangoes (Alphonso or Kesar)","½ cup yogurt (dahi)","3 tbsp sugar or honey","½ tsp cardamom powder","Pinch of salt","Popsicle moulds and sticks"],
    steps:[
      {safety:false, text:"Wash hands with soap for 20 seconds. Wash the mangoes under running water.",
},
      {safety:false, text:"Ask a grown-up to peel the mangoes and cut all the flesh away from the seed into a bowl.",
},
      {safety:false, text:"Add mango pieces, yogurt, sugar, cardamom powder, and a pinch of salt into the blender.",
},
      {safety:false, text:"Hold the blender lid firmly with BOTH hands and blend for 30 seconds until completely smooth.",
},
      {safety:false, text:"Taste a small spoonful. Add more sugar if you'd like it sweeter. Blend 5 more seconds.",
},
      {safety:false, text:"Pour carefully into popsicle moulds, filling about ¾ full — leave space at the top.",
},
      {safety:false, text:"Insert popsicle sticks into the centre of each mould. Cover with lid or foil.",
},
      {safety:false, text:"Place the moulds flat in the freezer for at least 6 hours — overnight is best.",
},
      {safety:false, text:"To unmould: run warm water over the outside of the mould for 10 seconds, then gently pull the stick.",
},
    ],
  },

  {
    id:2, name:"Fruit Chaat", hindi:"फ्रूट चाट", emoji:"🥗",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"10 mins", badge:"Chaat Champ 🏆", tags:["healthy","snack"],
    desc:"Tangy colourful fruit salad with chaat masala — India's favourite street snack!",
    ingredients:["1 apple","1 banana","1 orange","½ cup grapes","½ cup pomegranate seeds","1 tsp chaat masala","½ tsp roasted cumin powder","1 tsp lemon juice","Pinch of black salt","Fresh mint leaves to garnish"],
    steps:[
      {safety:false, text:"Wash hands with soap. Wash every piece of fruit thoroughly under running water.",
},
      {safety:false, text:"Ask a grown-up to chop the apple into small bite-sized cubes and remove all seeds.",
},
      {safety:false, text:"Peel the banana and slice into rounds about 1 cm thick — like little coins.",
},
      {safety:false, text:"Peel the orange and separate into segments. Remove any white stringy pith and seeds.",
},
      {safety:false, text:"Put all cut fruits into a large mixing bowl. Add grapes and pomegranate seeds.",
},
      {safety:false, text:"Sprinkle chaat masala, roasted cumin powder, and black salt evenly over all the fruit.",
},
      {safety:false, text:"Squeeze the lemon juice over everything. Mix GENTLY with a big spoon — only 5 or 6 slow folds.",
},
      {safety:false, text:"Taste one piece of fruit. Add more chaat masala or lemon if needed.",
},
      {safety:false, text:"Tear fresh mint leaves and scatter over the top. Serve immediately for the best flavour!",
},
    ],
  },

  {
    id:3, name:"Mango Lassi", hindi:"आम की लस्सी", emoji:"🥭",
    cuisine:"North Indian", diet:"veg", level:"starter", section:"kids",
    time:"5 mins", badge:"Lassi Legend 🥭", tags:["drink","summer"],
    desc:"India's most loved summer drink — thick, creamy and bursting with mango!",
    ingredients:["1 large ripe mango (Alphonso or Kesar)","1 cup thick yogurt — full fat dahi","½ cup chilled milk","2 to 3 tbsp sugar (start with 2, taste and add more)","¼ tsp cardamom powder — do NOT skip this!","4 to 5 ice cubes","Optional: pinch of saffron soaked in 1 tsp warm milk"],
    steps:[
      {safety:false, text:"Wash hands and wash the mango thoroughly under running water.",
},
      {safety:false, text:"Ask a grown-up to peel the mango and slice all the flesh away from the seed, directly into the blender jar.",
},
      {safety:false, text:"Add 1 cup of thick yogurt into the blender on top of the mango pieces.",
},
      {safety:false, text:"Pour in ½ cup of chilled milk.",
},
      {safety:false, text:"Add 2 tablespoons of sugar and ¼ teaspoon of cardamom powder. The cardamom is essential!",
},
      {safety:false, text:"Add the saffron-soaked milk if using. Drop in the ice cubes.",
},
      {safety:false, text:"Lid on TIGHTLY with both hands. Blend for a full 45 seconds until completely smooth and frothy.",
},
      {safety:false, text:"Open and taste with a clean spoon. Add more sugar if needed and blend 5 more seconds.",
},
      {safety:false, text:"Pour into tall chilled glasses. Sprinkle a tiny pinch of cardamom on top. Add a mango slice on the rim.",
},
    ],
  },

  {
    id:4, name:"Banana Smoothie", hindi:"केला स्मूदी", emoji:"🍌",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"5 mins", badge:"Smoothie Star 🌀", tags:["drink","healthy"],
    desc:"Thick, creamy banana smoothie — a power-packed breakfast in a glass!",
    ingredients:["2 ripe bananas — spotty yellow ones are sweetest!","1 cup milk (any type)","2 tbsp honey or sugar","½ tsp vanilla essence","¼ tsp cinnamon powder","4 to 5 ice cubes","Optional: 1 tbsp peanut butter for extra protein"],
    steps:[
      {safety:false, text:"Wash hands. Peel both bananas and break into chunks into the blender.",
},
      {safety:false, text:"Pour in 1 cup of milk.",
},
      {safety:false, text:"Add honey, vanilla essence, and cinnamon powder. Add peanut butter if using.",
},
      {safety:false, text:"Add ice cubes.",
},
      {safety:false, text:"Lid on tight! Blend for 30 to 40 seconds until completely smooth — no banana chunks remaining.",
},
      {safety:false, text:"Taste a small amount. Add more honey if not sweet enough, a splash more milk if too thick.",
},
      {safety:false, text:"Pour into a tall glass. Add a banana slice on the rim for a professional touch!",
},
    ],
  },

  {
    id:5, name:"Veggie Sandwich", hindi:"वेजी सैंडविच", emoji:"🥪",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"10 mins", badge:"Sandwich Superstar 🌟", tags:["lunch","no-cook"],
    desc:"Rainbow-stacked sandwich with mint chutney and crunchy vegetables!",
    ingredients:["4 slices bread (white, brown, or multigrain)","2 tbsp mint-coriander chutney","2 tbsp soft butter or cream cheese","½ cucumber, thinly sliced","1 tomato, thinly sliced","4 to 5 lettuce leaves","½ capsicum, thinly sliced","2 cheese slices (optional)","Salt and black pepper to taste"],
    steps:[
      {safety:false, text:"Wash hands and lay ALL ingredients on a clean, dry surface before starting.",
},
      {safety:false, text:"Wash the cucumber, tomato, and capsicum. Pat them COMPLETELY dry with a kitchen towel.",
},
      {safety:false, text:"Ask a grown-up to slice the cucumber, tomato, and capsicum into thin, even pieces.",
},
      {safety:false, text:"Lay two bread slices side by side. Spread butter or cream cheese on one slice, all the way to every edge and corner.",
},
      {safety:false, text:"Spread mint chutney generously on the second slice — all the way to the edges.",
},
      {safety:false, text:"Layer vegetables: lettuce first, then tomato, then cucumber, then capsicum.",
},
      {safety:false, text:"Sprinkle a small pinch of salt and pepper over the vegetables. Add cheese slices if using.",
},
      {safety:false, text:"Press the chutney slice on top, chutney side facing DOWN toward the filling. Press firmly with both palms.",
},
      {safety:false, text:"Ask a grown-up to cut diagonally from corner to corner. Serve with cut sides facing out!",
},
    ],
  },

  {
    id:6, name:"Coconut Ladoo", hindi:"नारियल लड्डू", emoji:"🍬",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"15 mins + 30 mins setting", badge:"Sweet Maker 🍬", tags:["sweet","festival"],
    desc:"No-cook coconut ladoos — just mix, roll, and refrigerate!",
    ingredients:["2 cups desiccated coconut plus extra for rolling","1 cup condensed milk","½ tsp cardamom powder","1 tbsp ghee","Optional: pinch of saffron in 1 tsp warm milk","Silver sprinkles or almond slivers for decoration"],
    steps:[
      {safety:false, text:"Wash hands very well with soap. You'll be rolling with your hands so cleanliness is essential.",
},
      {safety:false, text:"Add 2 cups of desiccated coconut to a large mixing bowl. Add cardamom powder and mix through with a spoon.",
},
      {safety:false, text:"Add the saffron-soaked milk if using and mix through.",
},
      {safety:false, text:"Add 1 tablespoon of ghee, then slowly pour in the condensed milk. Mix with a spoon first, then with clean hands until a firm dough forms.",
},
      {safety:false, text:"Taste a tiny pinch. Adjust sweetness if needed.",
},
      {safety:false, text:"Cover the bowl and refrigerate for 15 minutes. This makes rolling much easier.",
},
      {safety:false, text:"Take 1 tablespoon of mixture. Roll firmly between both palms in circular motions until perfectly round and smooth.",
},
      {safety:false, text:"Roll each ball in extra desiccated coconut until completely coated all around. Place on a plate.",
},
      {safety:false, text:"Press a sprinkle or almond sliver into the top of each ladoo for decoration.",
},
      {safety:false, text:"Refrigerate for 30 more minutes to firm up completely. Serve chilled!",
},
    ],
  },

  {
    id:7, name:"Nimbu Paani", hindi:"नींबू पानी", emoji:"🍋",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"5 mins", badge:"Lemonade Legend 🍋", tags:["drink","summer"],
    desc:"Classic Indian lemonade with black salt and fresh mint — summer in a glass!",
    ingredients:["2 lemons","2 cups cold water","2 to 3 tbsp sugar","¼ tsp black salt (kala namak) — essential!","¼ tsp roasted cumin powder","8 to 10 fresh mint leaves","Ice cubes","Optional: soda water for a fizzy version"],
    steps:[
      {safety:false, text:"Wash hands. Wash the lemons and mint leaves. Roll the lemons firmly on the counter first — this gets more juice out!",
},
      {safety:false, text:"Ask a grown-up to cut the lemons in half. Set up glasses with ice while they cut.",
},
      {safety:false, text:"Squeeze both lemons completely into a glass or jug. Catch any seeds.",
},
      {safety:false, text:"Add the sugar directly to the concentrated lemon juice and stir vigorously for 30 seconds until syrupy.",
},
      {safety:false, text:"Add black salt and roasted cumin powder. Stir well.",
},
      {safety:false, text:"Add the cold water. Stir everything together. Taste and adjust.",
},
      {safety:false, text:"Add ice to two tall glasses. Tear the mint leaves once or twice and drop into the glasses.",
},
      {safety:false, text:"Pour the nimbu paani over the ice and mint. For fizzy version, top with soda water. Garnish with a lemon slice on the rim!",
},
    ],
  },

  {
    id:8, name:"Curd Rice", hindi:"दही चावल", emoji:"🍚",
    cuisine:"South Indian", diet:"veg", level:"starter", section:"kids",
    time:"10 mins", badge:"Curd Master 🍚", tags:["south","meal"],
    desc:"Creamy, cooling curd rice — Tamil Nadu's ultimate comfort food!",
    ingredients:["1 cup cooked rice (leftover rice is perfect!)","1 cup thick yogurt (dahi)","2 tbsp milk","½ tsp salt","¼ tsp roasted cumin powder","2 tbsp pomegranate seeds (garnish)","1 tbsp finely grated carrot","For tadka: 1 tsp oil, ¼ tsp mustard seeds, 5 curry leaves"],
    steps:[
      {safety:false, text:"Wash hands. Place cooked rice in a large bowl. If it's hot, let it cool to room temperature first.",
},
      {safety:false, text:"Gently press the rice with the back of a spoon to break up clumps — about 10 gentle presses.",
},
      {safety:false, text:"Add 2 tablespoons of milk to the rice and mix through. This keeps the curd rice soft and creamy.",
},
      {safety:false, text:"Pour 1 cup yogurt over the rice. Add salt and roasted cumin powder. Mix well and taste.",
},
      {safety:true, text:"GROWN-UP STEP — Heat 1 tsp oil, add mustard seeds until they pop, add curry leaves. Pour the hot tadka over the curd rice.",
},
      {safety:false, text:"Stir the tadka gently through the curd rice so the mustard seeds and curry leaves distribute evenly.",
},
      {safety:false, text:"Garnish with pomegranate seeds and grated carrot. Serve at room temperature or slightly chilled.",
},
    ],
  },

  {
    id:9, name:"Strawberry Milkshake", hindi:"स्ट्रॉबेरी मिल्कशेक", emoji:"🍓",
    cuisine:"Western", diet:"veg", level:"starter", section:"kids",
    time:"5 mins", badge:"Shake King 👑", tags:["drink","sweet"],
    desc:"Thick, creamy strawberry milkshake — the most beautiful pink drink ever!",
    ingredients:["1 cup fresh or frozen strawberries","1.5 cups chilled whole milk","2 scoops vanilla ice cream","2 tbsp sugar","¼ tsp vanilla essence","Whipped cream for topping","1 fresh strawberry for the rim"],
    steps:[
      {safety:false, text:"Wash hands. Wash fresh strawberries under cold running water — cold, not warm.",
},
      {safety:false, text:"Pull the green leafy stalks off each strawberry. Ask for help with a knife if any are stubborn.",
},
      {safety:false, text:"Add strawberries to the blender. Frozen strawberries make it extra thick and cold!",
},
      {safety:false, text:"Add the chilled milk, sugar, and vanilla essence.",
},
      {safety:false, text:"Add 2 generous scoops of vanilla ice cream — this is what makes it a MILKSHAKE!",
},
      {safety:false, text:"Lid on tight with both hands! Blend for 30 to 40 seconds until thick, smooth and gorgeously pink.",
},
      {safety:false, text:"Pour into the tallest glass you have. Top with whipped cream. Place a fresh strawberry on the rim.",
},
    ],
  },

  {
    id:10, name:"Peanut Butter Toast", hindi:"पीनट बटर टोस्ट", emoji:"🍞",
    cuisine:"Western", diet:"veg", level:"starter", section:"kids",
    time:"5 mins", badge:"Toast Titan 🍞", tags:["breakfast","quick"],
    desc:"The ultimate quick breakfast — crispy toast with peanut butter and honey banana!",
    ingredients:["2 thick slices of bread","2 tbsp peanut butter (smooth or crunchy)","1 ripe banana","1 tbsp honey","Pinch of ground cinnamon","Optional: a handful of chocolate chips"],
    steps:[
      {safety:false, text:"Wash hands. Place bread in the toaster and toast until golden and crispy.",
},
      {safety:false, text:"While the toast is toasting, peel the banana and slice into thin rounds — about half a centimetre thick.",
},
      {safety:false, text:"When the toast pops up, remove carefully — it is HOT! Place both slices on your plate.",
},
      {safety:false, text:"IMMEDIATELY spread peanut butter on each slice while the toast is still warm — warm toast spreads peanut butter so much more easily.",
},
      {safety:false, text:"Arrange banana slices over the peanut butter, covering the entire surface.",
},
      {safety:false, text:"Drizzle honey back and forth over the banana slices in a zigzag pattern.",
},
      {safety:false, text:"Sprinkle a tiny pinch of cinnamon. Add chocolate chips for a special treat. Eat immediately — warm!",
},
    ],
  },

  {
    id:11, name:"Raita", hindi:"रायता", emoji:"🥣",
    cuisine:"North Indian", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Raita Rockstar 🎸", tags:["side","healthy"],
    desc:"Cool, creamy cucumber raita — the perfect partner for any spicy meal!",
    ingredients:["1.5 cups thick yogurt (dahi)","½ cucumber","1 small tomato","2 tbsp fresh coriander — finely chopped","½ tsp roasted cumin powder","¼ tsp black salt (kala namak)","Regular salt to taste","Pinch of red chilli powder for garnish"],
    steps:[
      {safety:false, text:"Wash hands. Wash cucumber, tomato, and coriander. Pat them COMPLETELY dry.",
},
      {safety:false, text:"Ask a grown-up to grate the cucumber or chop it into very small cubes.",
},
      {safety:false, text:"If using grated cucumber: squeeze it firmly between your palms over the sink to remove excess water.",
},
      {safety:false, text:"Ask a grown-up to deseed the tomato and chop the flesh into small cubes. Finely chop the coriander.",
},
      {safety:false, text:"Pour yogurt into a bowl and whisk smooth with a fork for 20 seconds.",
},
      {safety:false, text:"Add cucumber, tomato, and coriander to the yogurt. Fold gently — 5 or 6 slow folds.",
},
      {safety:false, text:"Add roasted cumin powder, black salt, and regular salt. Mix gently and taste.",
},
      {safety:false, text:"Transfer to a serving bowl. Sprinkle red chilli powder and cumin in the centre for garnish. Chill 10 minutes before serving.",
},
    ],
  },

  {
    id:12, name:"Watermelon Juice", hindi:"तरबूज का रस", emoji:"🍉",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"5 mins", badge:"Juice Jaguar 🐆", tags:["drink","summer"],
    desc:"Pure fresh watermelon juice — 92% water, 100% summer refreshment!",
    ingredients:["4 cups watermelon flesh — cubed, seeds removed","1 tbsp sugar (optional — taste the watermelon first!)","¼ tsp black salt","1 tbsp lemon juice","5 to 6 fresh mint leaves","Plenty of ice cubes"],
    steps:[
      {safety:false, text:"Wash hands. Ask a grown-up to cut the watermelon into large slices.",
},
      {safety:false, text:"Separate the red flesh from the green rind. Cube the flesh and remove as many black seeds as you can see.",
},
      {safety:false, text:"Add all 4 cups of watermelon cubes to the blender.",
},
      {safety:false, text:"Add black salt and lemon juice. Add sugar ONLY if your watermelon isn't very sweet.",
},
      {safety:false, text:"Lid on tight and blend for 20 to 30 seconds until completely smooth.",
},
      {safety:false, text:"Optional: pour through a fine mesh strainer for silky clear juice.",
},
      {safety:false, text:"Pour over ice, tear mint leaves and add them. Drink IMMEDIATELY!",
},
    ],
  },

  {
    id:13, name:"Atta Ladoo", hindi:"आटा लड्डू", emoji:"🟤",
    cuisine:"North Indian", diet:"veg", level:"starter", section:"kids",
    time:"20 mins + cooling", badge:"Ladoo Legend 🟤", tags:["sweet","festival"],
    desc:"Classic whole wheat ladoos with jaggery and ghee — India's original energy ball!",
    ingredients:["2 cups whole wheat flour (atta)","½ cup powdered jaggery or icing sugar","½ cup ghee — melted and warm","½ tsp cardamom powder","2 tbsp finely chopped mixed nuts (optional)"],
    steps:[
      {safety:true, text:"GROWN-UP STEP — Dry roast the atta in a heavy pan on the LOWEST heat, stirring continuously, for 8 to 10 minutes until golden and nutty-smelling.",
},
      {safety:false, text:"Remove from heat. Pour the roasted atta into a large bowl and let it cool for 10 full minutes. Don't skip cooling!",
},
      {safety:false, text:"Add powdered jaggery and cardamom powder to the cooled atta. Mix thoroughly.",
},
      {safety:false, text:"Add chopped nuts if using. Mix through evenly.",
},
      {safety:false, text:"Add the warm melted ghee GRADUALLY — a little at a time — mixing as you go. Test: squeeze a handful. If it holds together, enough ghee has been added.",
},
      {safety:false, text:"While still warm, take 1 tablespoon of mixture and press firmly between both palms into a round ball. Apply real pressure!",
},
      {safety:false, text:"Continue until all the mixture is used. Let the finished ladoos cool completely for 20 minutes before serving.",
},
    ],
  },

  {
    id:14, name:"Mixed Fruit Popsicle", hindi:"फ्रूट पॉप्सिकल", emoji:"🍭",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"15 mins + freeze overnight", badge:"Popsicle Pro 🍭", tags:["summer","fun"],
    desc:"Rainbow layered popsicles — three colour fruit layers frozen to perfection!",
    ingredients:["1 cup watermelon pieces (red layer)","1 cup mango pieces or pulp (orange layer)","1 cup kiwi pieces or green grapes (green layer)","2 tbsp sugar — divided","Popsicle moulds and sticks"],
    steps:[
      {safety:false, text:"Wash hands. Set up three separate small bowls — one for each colour: red, orange, and green.",
},
      {safety:false, text:"Blend watermelon with a pinch of sugar until smooth. Pour into the BOTTOM ⅓ of each mould. Tap moulds to settle.",
},
      {safety:false, text:"Freeze the red layer for 45 minutes until completely solid before adding the next layer.",
},
      {safety:false, text:"Blend mango with a pinch of sugar until smooth. GENTLY pour over the frozen red layer, filling to ⅔ full.",
},
      {safety:false, text:"Blend kiwi or green grapes with a pinch of sugar. Pour gently as the final layer. Insert sticks straight and centred. Freeze overnight.",
},
      {safety:false, text:"To unmould: run warm water over the outside for 10 seconds and pull gently.",
},
    ],
  },

  {
    id:15, name:"Chocolate Banana Bowl", hindi:"चॉकलेट केला बाउल", emoji:"🍫",
    cuisine:"Western", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Bowl Beauty 🍫", tags:["breakfast","sweet"],
    desc:"Layered banana, granola and chocolate — a gorgeous no-cook breakfast bowl!",
    ingredients:["2 ripe bananas","½ cup granola (readymade)","2 tbsp Nutella or chocolate spread","2 tbsp peanut butter","1 tbsp honey","A few fresh strawberries or blueberries","A sprinkle of desiccated coconut","Pinch of cinnamon"],
    steps:[
      {safety:false, text:"Wash hands. Peel both bananas. Slice one into rounds. Mash the other completely smooth in a bowl.",
},
      {safety:false, text:"Spoon the mashed banana into your serving bowl and spread it flat — this is your base.",
},
      {safety:false, text:"Scatter a generous layer of granola over the mashed banana.",
},
      {safety:false, text:"Dollop peanut butter on one side of the bowl and Nutella on the other side. Don't mix them yet!",
},
      {safety:false, text:"Arrange the banana slices and fresh berries artistically across the top.",
},
      {safety:false, text:"Drizzle honey over everything. Sprinkle desiccated coconut and a pinch of cinnamon on top.",
},
    ],
  },

  // ── STARTER · NON-VEG ──────────────────────────────────────

  {
    id:16, name:"Chicken Sandwich", hindi:"चिकन सैंडविच", emoji:"🥪",
    cuisine:"Pan-India", diet:"non-veg", level:"starter", section:"kids",
    time:"10 mins", badge:"Sandwich Pro 🥪", tags:["lunch","protein"],
    desc:"Easy chicken mayo sandwich with crispy vegetables — protein-packed and satisfying!",
    ingredients:["½ cup cooked shredded chicken","2 tbsp mayonnaise","1 tsp mustard","Salt and black pepper","4 slices bread","Lettuce, tomato slices, cucumber slices","1 tbsp softened butter"],
    steps:[
      {safety:false, text:"Wash hands. Use two forks to shred the cooked chicken into small, even pieces.",
},
      {safety:false, text:"Add mayonnaise, mustard, salt, and pepper to the chicken. Mix until every piece is evenly coated. TASTE it!",
},
      {safety:false, text:"Wash all vegetables and pat completely dry. Ask a grown-up to slice tomato and cucumber.",
},
      {safety:false, text:"Spread butter on BOTH slices of bread from edge to edge.",
},
      {safety:false, text:"Layer: lettuce first, then the chicken mixture, then tomato, then cucumber.",
},
      {safety:false, text:"Press the second slice on top firmly with both palms. Ask a grown-up to cut diagonally. Serve immediately!",
},
    ],
  },

  {
    id:17, name:"Tuna Sandwich", hindi:"टूना सैंडविच", emoji:"🐟",
    cuisine:"Western", diet:"non-veg", level:"starter", section:"kids",
    time:"10 mins", badge:"Tuna Titan 🐟", tags:["lunch","protein"],
    desc:"Classic tuna mayo sandwich — quick, protein-packed and endlessly satisfying!",
    ingredients:["1 can tuna in water — drained very well","2 tbsp mayonnaise","1 tsp lemon juice","Salt and black pepper","4 slices bread","Crisp lettuce leaves, tomato slices","Optional: 2 tbsp sweetcorn"],
    steps:[
      {safety:false, text:"Wash hands. Open the tuna can and drain it completely — press the lid down to squeeze out all liquid.",
},
      {safety:false, text:"Transfer the drained tuna to a bowl and flake it apart with a fork into small, even pieces.",
},
      {safety:false, text:"Add mayonnaise, lemon juice, salt, and pepper. Mix well. Add sweetcorn if using.",
},
      {safety:false, text:"Taste the tuna mixture and adjust seasoning — more lemon, more pepper, or more mayo as needed.",
},
      {safety:false, text:"Lay out bread. Spread tuna mixture on one slice. Top with lettuce and tomato slices.",
},
      {safety:false, text:"Press the second slice on top. Ask a grown-up to cut diagonally. Eat IMMEDIATELY!",
},
    ],
  },

  {
    id:18, name:"Boiled Egg Salad", hindi:"उबले अंडे का सलाद", emoji:"🥚",
    cuisine:"Pan-India", diet:"non-veg", level:"starter", section:"kids",
    time:"15 mins", badge:"Egg Expert 🥚", tags:["healthy","protein"],
    desc:"Creamy boiled egg salad — protein-rich, quick to make, completely satisfying!",
    ingredients:["3 eggs — hard boiled","2 tbsp mayonnaise","1 tsp Dijon or yellow mustard","1 tsp lemon juice","Salt and black pepper","1 tbsp fresh chives or spring onion — finely sliced","Paprika for garnish","Crisp lettuce leaves to serve on"],
    steps:[
      {safety:true, text:"GROWN-UP STEP — Hard boil the eggs: in cold water, bring to a boil, simmer exactly 9 minutes. Immediately transfer to cold water.",
},
      {safety:false, text:"Once eggs are cool, tap all around on the counter to crack the shell. Peel under a thin stream of running water.",
},
      {safety:false, text:"Ask a grown-up to halve each egg. Then chop them into rough chunks — some big, some smaller.",
},
      {safety:false, text:"In a separate bowl, mix mayonnaise, mustard, lemon juice, salt, and pepper until smooth. TASTE the dressing.",
},
      {safety:false, text:"Gently fold the egg chunks into the dressing — only 4 to 5 slow folds. Don't overmix or the eggs crumble.",
},
      {safety:false, text:"Stir in chives or spring onion. Taste and adjust seasoning. Serve on lettuce with a sprinkle of paprika.",
},
    ],
  },

  // ── STARTER · COLLEGE ──────────────────────────────────────

  {
    id:19, name:"Overnight Oats", hindi:"ओट्स", emoji:"🥣",
    cuisine:"Western", diet:"veg", level:"starter", section:"college",
    time:"5 mins prep + overnight", badge:"Oat Overlord 🌾", tags:["breakfast","meal-prep"],
    desc:"Prep tonight, wake up to a complete breakfast — zero morning effort!",
    ingredients:["½ cup rolled oats — NOT instant oats","½ cup milk (any type)","¼ cup plain yogurt","1 tbsp honey or maple syrup","½ tsp vanilla essence","Toppings: banana, berries, nuts, seeds, peanut butter"],
    steps:[
      {safety:false, text:"Wash hands. Get a jar or container with a tight lid. Add ½ cup of rolled oats.",
},
      {safety:false, text:"Pour in ½ cup milk and add ¼ cup yogurt, honey, and vanilla essence. Stir until every oat is coated.",
},
      {safety:false, text:"TASTE the raw mixture. Fix the flavour NOW before refrigerating.",
},
      {safety:false, text:"Add any fruits, nuts, or mix-ins directly into the mixture and stir through.",
},
      {safety:false, text:"Seal the container tightly and refrigerate overnight — or for at least 6 hours.",
},
      {safety:false, text:"In the morning, stir and add fresh toppings. Eat cold, straight from the jar!",
},
    ],
  },

  {
    id:20, name:"Greek Salad", hindi:"ग्रीक सलाद", emoji:"🥗",
    cuisine:"Western", diet:"veg", level:"starter", section:"college",
    time:"10 mins", badge:"Salad Sage 🌿", tags:["lunch","healthy"],
    desc:"Fresh feta, olives and vegetables — Mediterranean sunshine on a plate!",
    ingredients:["1 cucumber","2 ripe tomatoes","½ red onion","½ cup feta cheese","½ cup olives (black or kalamata)","3 tbsp olive oil","1 tbsp red wine vinegar or lemon juice","1 tsp dried oregano","Salt and black pepper"],
    steps:[
      {safety:false, text:"Wash hands. Wash all vegetables under cold running water and pat dry.",
},
      {safety:false, text:"Ask a grown-up to chop cucumber into half-moon slices, tomatoes into wedges, and red onion into very thin half-rings.",
},
      {safety:false, text:"Add all vegetables and olives to a large mixing bowl.",
},
      {safety:false, text:"Break feta cheese into generous chunks OVER the top. Do NOT mix it in yet.",
},
      {safety:false, text:"Make the dressing: combine olive oil, vinegar or lemon, oregano, salt and pepper. TASTE it.",
},
      {safety:false, text:"Drizzle dressing over the salad. Toss VERY gently — just 2 or 3 folds. Serve immediately.",
},
    ],
  },

  {
    id:21, name:"Avocado Toast", hindi:"एवोकाडो टोस्ट", emoji:"🥑",
    cuisine:"Western", diet:"veg", level:"starter", section:"college",
    time:"5 mins", badge:"Avo Ace 🥑", tags:["breakfast","quick"],
    desc:"Nutritious, trendy avocado toast — ready in 5 minutes, lasts all morning!",
    ingredients:["1 ripe avocado (gives slightly when pressed)","2 slices thick bread","1 tbsp lemon juice","Salt and black pepper","Red chilli flakes","Optional: cherry tomatoes, fried egg, everything bagel seasoning"],
    steps:[
      {safety:false, text:"Wash hands. Toast your bread until golden brown and crispy while you prepare the avocado.",
},
      {safety:false, text:"Ask a grown-up to halve the avocado lengthways around the seed, twist apart, and remove the seed with a spoon.",
},
      {safety:false, text:"Use a large spoon to scoop the avocado flesh out of the skin in one piece. Add to a bowl.",
},
      {safety:false, text:"Add lemon juice, salt, and pepper. Mash with a fork to your preferred consistency — smooth or chunky.",
},
      {safety:false, text:"Spread the mashed avocado generously on the hot toast. Go to every edge!",
},
      {safety:false, text:"Sprinkle red chilli flakes. Add any extra toppings. Eat IMMEDIATELY while the toast is hot and crispy!",
},
    ],
  },

  {
    id:22, name:"Protein Smoothie", hindi:"प्रोटीन स्मूदी", emoji:"💪",
    cuisine:"Western", diet:"veg", level:"starter", section:"college",
    time:"5 mins", badge:"Gym Guru 💪", tags:["gym","healthy"],
    desc:"Post-workout peanut butter banana smoothie — fuel your body and taste buds!",
    ingredients:["2 ripe bananas","2 tbsp peanut butter","1 cup milk or almond milk","½ cup Greek yogurt","1 tbsp honey","½ tsp cinnamon","4 to 5 ice cubes","Optional: 1 scoop protein powder"],
    steps:[
      {safety:false, text:"Wash hands. Peel bananas and break into chunks into the blender.",
},
      {safety:false, text:"Add peanut butter, milk, Greek yogurt, honey, and cinnamon.",
},
      {safety:false, text:"Add protein powder if using. Add the ice cubes.",
},
      {safety:false, text:"Lid on TIGHT and blend for a full 45 seconds until completely smooth.",
},
      {safety:false, text:"Taste and adjust — more honey, more peanut butter, or more yogurt as needed.",
},
      {safety:false, text:"Pour into a large cup. Drink immediately or refrigerate for up to 4 hours.",
},
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 🔥  EXPLORER  ·  BUDDY COOK MODE  ·  SOME HEAT
  // ──────────────────────────────────────────────────────────────

  {
    id:30, name:"Poha", hindi:"पोहा", emoji:"🍽️",
    cuisine:"Marathi", diet:"veg", level:"explorer", section:"kids",
    time:"15 mins", badge:"Poha Pro 🌟", tags:["breakfast","regional"],
    desc:"Maharashtra's beloved breakfast — fluffy golden flattened rice with mustard and curry leaves!",
    ingredients:["1.5 cups thick poha (flattened rice)","1 medium onion — finely chopped","1 boiled potato — cubed (optional)","2 green chillies — finely chopped","½ tsp mustard seeds","8 to 10 curry leaves","1 tsp oil","½ tsp turmeric","1 tsp sugar","Salt to taste","2 tbsp fresh coriander","1 tbsp lemon juice","2 tbsp roasted peanuts"],
    steps:[
      {safety:false, text:"Wash hands. Place poha in a colander and rinse under running water for 30 seconds, moving it gently.",
},
      {safety:false, text:"Leave rinsed poha in the colander for 5 minutes. Test: press a grain between thumb and finger — it should squish completely with NO hard centre.",
},
      {safety:false, text:"Sprinkle turmeric, sugar, and salt over the poha. Mix with a FORK — very gently.",
},
      {safety:true, text:"BUDDY STEP — Ask your grown-up to heat 1 tsp oil in a wide pan over medium flame.",
},
      {safety:true, text:"GROWN-UP — Add mustard seeds to hot oil. Wait for them to pop and slow down — about 15 seconds.",
},
      {safety:true, text:"GROWN-UP — Add curry leaves and green chillies. Stand BACK — they splatter! Cook 10 seconds.",
},
      {safety:true, text:"GROWN-UP — Add chopped onions. Cook on medium heat for 3 to 4 minutes, stirring every minute, until golden.",
},
      {safety:true, text:"GROWN-UP — Add cubed boiled potato if using. Mix for 1 minute.",
},
      {safety:true, text:"GROWN-UP — Add the turmeric-seasoned poha to the pan. Fold GENTLY with a spatula — 8 to 10 slow folds. Turn off heat.",
},
      {safety:false, text:"Squeeze lemon juice over the hot poha. Add roasted peanuts and fresh coriander. Mix gently one last time.",
},
    ],
  },

  {
    id:31, name:"Upma", hindi:"उपमा", emoji:"🥣",
    cuisine:"South Indian", diet:"veg", level:"explorer", section:"kids",
    time:"15 mins", badge:"Upma Ustad 🎓", tags:["breakfast","healthy"],
    desc:"Semolina breakfast with vegetables — the most nutritious South Indian morning meal!",
    ingredients:["1 cup semolina (rava or suji)","1 small onion — chopped","1 small tomato — chopped","½ cup mixed vegetables (peas, carrot, beans)","1 tsp mustard seeds","8 curry leaves","2 green chillies","1 tbsp oil","2 cups water","Salt to taste","Lemon juice and coriander to serve"],
    steps:[
      {safety:true, text:"GROWN-UP STEP — Dry roast the semolina in a pan on medium heat, stirring continuously, for 3 to 4 minutes until lightly golden.",
},
      {safety:true, text:"GROWN-UP — In the same pan, heat oil, add mustard seeds until they pop, then add curry leaves and chillies. Stand back from the splattering!",
},
      {safety:true, text:"GROWN-UP — Add onions and cook for 3 minutes until soft. Add tomatoes and vegetables. Cook for 2 more minutes.",
},
      {safety:true, text:"GROWN-UP — Add 2 cups water and salt. Bring to a full rolling boil.",
},
      {safety:true, text:"GROWN-UP — Reduce to low heat. Add roasted rava in a SLOW STEADY STREAM with one hand while stirring VIGOROUSLY with the other. Don't stop stirring!",
},
      {safety:true, text:"GROWN-UP — Cover and cook on lowest heat for 2 minutes. Then uncover, stir well, break any lumps.",
},
      {safety:false, text:"Squeeze lemon juice over the upma. Add fresh coriander. Taste and adjust salt. Serve hot!",
},
    ],
  },

  {
    id:32, name:"Maggi Upgrade", hindi:"मसाला मैगी", emoji:"🍜",
    cuisine:"Pan-India", diet:"veg", level:"explorer", section:"kids",
    time:"7 mins", badge:"Noodle Ninja 🥷", tags:["snack","fun"],
    desc:"Maggi elevated to chef level — vegetables, proper seasoning, totally next level!",
    ingredients:["1 Maggi noodles packet plus tastemaker sachet","½ cup mixed vegetables (peas, sweetcorn, carrot)","1 small onion — finely chopped","1 tbsp butter","½ tsp red chilli powder","1 tsp soy sauce","Optional: 1 egg","Green onions or coriander to finish"],
    steps:[
      {safety:false, text:"Wash hands. Chop all vegetables into small, consistent pieces BEFORE starting to cook.",
},
      {safety:true, text:"BUDDY STEP — Ask your grown-up to heat butter in a pan over medium heat. Add onions and cook 2 minutes.",
},
      {safety:true, text:"GROWN-UP — Add mixed vegetables. Stir-fry on medium-high heat for 2 minutes.",
},
      {safety:true, text:"GROWN-UP — Add 1.5 cups water. Bring to a rolling boil. Add Maggi noodles and break them apart.",
},
      {safety:true, text:"GROWN-UP — Add the Maggi tastemaker, red chilli powder, and soy sauce. Stir to combine everything.",
},
      {safety:true, text:"GROWN-UP — Optional egg: push noodles to the sides, crack egg in the centre, scramble quickly, then fold through the noodles.",
},
      {safety:false, text:"Remove from heat. Taste and adjust. Garnish with fresh green onions or coriander. Serve immediately!",
},
    ],
  },

  {
    id:33, name:"Suji Halwa", hindi:"सूजी का हलवा", emoji:"🟡",
    cuisine:"North Indian", diet:"veg", level:"explorer", section:"kids",
    time:"15 mins", badge:"Halwa Hero 🟡", tags:["sweet","festival"],
    desc:"Golden, fragrant semolina halwa — India's most comforting sweet!",
    ingredients:["1 cup semolina (suji or rava)","¾ cup sugar","3 cups water","¼ cup ghee","¼ tsp cardamom powder","Pinch of saffron in 2 tbsp warm water (optional)","2 tbsp mixed nuts — chopped","1 tbsp raisins"],
    steps:[
      {safety:false, text:"Wash hands. Prepare the sugar syrup FIRST: heat 3 cups water with sugar in a separate pan until sugar dissolves completely. Keep warm.",
},
      {safety:true, text:"GROWN-UP — Heat ghee in a heavy pan over medium heat. Add the semolina and roast, stirring constantly, for 4 to 5 minutes until golden and fragrant.",
},
      {safety:true, text:"GROWN-UP — Carefully add the warm sugar syrup to the roasted rava. It will spit and steam dramatically — stand back!",
},
      {safety:true, text:"GROWN-UP — Stir vigorously to prevent lumps. Add saffron water and cardamom. Keep stirring on medium heat.",
},
      {safety:true, text:"GROWN-UP — Continue stirring on medium-low heat until the halwa pulls away from the sides of the pan and becomes one unified mass.",
},
      {safety:false, text:"Add the chopped nuts and raisins. Fold through gently.",
},
      {safety:false, text:"Serve immediately in bowls. Halwa is best eaten hot! Garnish with extra nuts on top.",
},
    ],
  },

  {
    id:34, name:"Coconut Chutney", hindi:"नारियल चटनी", emoji:"🥥",
    cuisine:"South Indian", diet:"veg", level:"explorer", section:"kids",
    time:"10 mins", badge:"Chutney Champ 🥥", tags:["side","south"],
    desc:"Creamy coconut chutney — the essential companion to idli and dosa!",
    ingredients:["1 cup fresh grated coconut (or desiccated)","2 tbsp roasted chana dal (gives body and nuttiness!)","2 green chillies","1 small piece ginger","Salt to taste","½ cup water","For tadka: 1 tsp oil, ½ tsp mustard seeds, 5 to 6 curry leaves, 1 dry red chilli"],
    steps:[
      {safety:false, text:"Wash hands. Combine coconut, roasted chana dal, green chillies, ginger, and salt in the blender jar.",
},
      {safety:false, text:"Add ½ cup water. Close the lid and blend for 45 seconds until smooth and thick.",
},
      {safety:false, text:"Taste the chutney. Adjust salt, chilli, or ginger to perfect the balance.",
},
      {safety:false, text:"Transfer the chutney to a serving bowl using a spatula to get every last bit.",
},
      {safety:true, text:"GROWN-UP — Make the tadka: heat 1 tsp oil in a small pan. Add mustard seeds and wait for them to pop.",
},
      {safety:true, text:"GROWN-UP — Add curry leaves and dry red chilli to the hot oil. They will crackle and spit! Crisp 10 seconds. Pour the ENTIRE hot tadka immediately over the chutney.",
},
      {safety:false, text:"Stir the tadka gently through the chutney. Serve immediately alongside idli or dosa!",
},
    ],
  },

  {
    id:35, name:"Idli", hindi:"इडली", emoji:"⚪",
    cuisine:"South Indian", diet:"veg", level:"explorer", section:"kids",
    time:"20 mins (from readymade batter)", badge:"Idli Icon ⚪", tags:["breakfast","south"],
    desc:"Soft, fluffy steamed idlis — the world's healthiest breakfast!",
    ingredients:["2 cups readymade idli batter","Salt to taste","A few drops oil for greasing the moulds","Water for the steamer"],
    steps:[
      {safety:false, text:"Wash hands. Take the idli batter out of the fridge 30 minutes before steaming.",
},
      {safety:false, text:"Stir the batter gently from the bottom. Check: it should pour like thick pancake batter — not too thick, not watery.",
},
      {safety:false, text:"Add salt if needed. Mix with ONLY 4 or 5 gentle folds. Over-stirring deflates the batter!",
},
      {safety:false, text:"Grease each idli mould cavity with a tiny drop of oil spread with your fingertip.",
},
      {safety:false, text:"Spoon the batter into each mould — fill only ¾ full, NOT to the top!",
},
      {safety:true, text:"GROWN-UP — Add water to the steamer and bring to a vigorous boil. Carefully lower the idli stand in. Cover and steam for 10 to 12 minutes on high heat.",
},
      {safety:true, text:"GROWN-UP — Test with a toothpick inserted into the centre of one idli — it must come out clean. Let rest 2 minutes before unmoulding.",
},
      {safety:false, text:"Dip a spoon in water and use it to gently scoop each idli out. Serve immediately with coconut chutney and sambar!",
},
    ],
  },

  {
    id:36, name:"Dhokla", hindi:"ढोकला", emoji:"🟡",
    cuisine:"Gujarati", diet:"veg", level:"explorer", section:"kids",
    time:"25 mins", badge:"Dhokla Dynamo 🟡", tags:["snack","gujarati"],
    desc:"Fluffy spongy steamed Gujarati dhokla — light, tangy and delicious!",
    ingredients:["1 cup besan (chickpea flour)","1 tbsp semolina (optional)","½ cup yogurt","½ tsp turmeric","1 tsp sugar","1 tsp ginger-green chilli paste","Salt to taste","1 tsp Eno fruit salt — this is what makes it fluffy!","For tadka: 1 tbsp oil, 1 tsp mustard seeds, 2 slit chillies, 8 curry leaves","2 tsp sugar in 3 tbsp water for drizzling"],
    steps:[
      {safety:false, text:"Wash hands. Combine besan, semolina, yogurt, turmeric, sugar, ginger-chilli paste, and salt in a large bowl. Mix well.",
},
      {safety:false, text:"Add water gradually — about ½ cup — to make a smooth, thick batter with no lumps. Beat well for 2 minutes.",
},
      {safety:true, text:"GROWN-UP — Grease a flat plate or dhokla tin with oil. Set up the steamer and bring to a full vigorous boil.",
},
      {safety:false, text:"Add Eno fruit salt to the batter and mix IMMEDIATELY and VIGOROUSLY for exactly 15 seconds. The batter will foam and increase in volume — this is perfect!",
},
      {safety:true, text:"GROWN-UP — Immediately pour the batter into the greased tin. Place in the steamer. Cover and steam for 15 minutes.",
},
      {safety:true, text:"GROWN-UP — Test with a toothpick — it should come out clean. Cool 5 minutes in the tin. Cut into squares.",
},
      {safety:true, text:"GROWN-UP — Make the tadka: heat oil, add mustard seeds until they pop, add curry leaves and slit chillies. Pour immediately over the cut dhokla.",
},
      {safety:false, text:"Drizzle the sugar water over the dhokla. Garnish with coriander. Serve with green chutney!",
},
    ],
  },

  {
    id:37, name:"Methi Thepla", hindi:"मेथी थेपला", emoji:"🟢",
    cuisine:"Gujarati", diet:"veg", level:"explorer", section:"kids",
    time:"20 mins", badge:"Thepla Titan 🫓", tags:["gujarati","flatbread"],
    desc:"Soft, thin fenugreek flatbreads — Gujarat's greatest travel food!",
    ingredients:["2 cups whole wheat flour (atta)","1 cup fresh methi leaves — finely chopped (or 2 tbsp dried kasuri methi)","½ cup yogurt","1 tsp turmeric","1 tsp red chilli powder","1 tsp cumin seeds","1 tsp sugar","Salt to taste","2 tsp oil for the dough plus oil for cooking"],
    steps:[
      {safety:false, text:"Wash hands. If using fresh methi, wash leaves thoroughly and chop finely. If using dried kasuri methi, crush it between your palms.",
},
      {safety:false, text:"Combine flour, methi, turmeric, red chilli powder, cumin seeds, sugar, salt, and oil in a large bowl. Mix well.",
},
      {safety:false, text:"Add yogurt gradually and knead to form a smooth, soft dough — softer than chapati dough.",
},
      {safety:false, text:"Divide the dough into 8 equal balls. Roll each smooth between your palms.",
},
      {safety:false, text:"Roll each ball into a thin circle about 15 to 17 cm wide using a rolling pin. Dust with flour if it sticks.",
},
      {safety:true, text:"GROWN-UP — Heat a tawa over medium heat. Cook each thepla for 1 minute until bubbles form, then flip.",
},
      {safety:true, text:"GROWN-UP — Apply a few drops of oil on the cooked side. Flip again. Cook until both sides have golden spots.",
},
      {safety:false, text:"Stack finished theplas together while warm to keep them soft. Serve with yogurt, pickle, or tea!",
},
    ],
  },

  {
    id:38, name:"Banana Pancakes", hindi:"केला पैनकेक", emoji:"🥞",
    cuisine:"Western", diet:"veg", level:"explorer", section:"kids",
    time:"15 mins", badge:"Pancake Prince 🥞", tags:["breakfast","sweet"],
    desc:"2-ingredient fluffy banana pancakes — naturally sweet, no flour needed!",
    ingredients:["2 very ripe bananas — spotty and brown-flecked ones are essential","2 eggs","Pinch of salt","½ tsp cinnamon","1 tsp vanilla essence","Butter for the pan","Honey, maple syrup, or fresh fruit to serve"],
    steps:[
      {safety:false, text:"Wash hands. Peel both bananas and put them in a large bowl.",
},
      {safety:false, text:"Mash the bananas completely with a fork until NO lumps remain. This takes 2 full minutes of determined mashing.",
},
      {safety:false, text:"Crack both eggs into the mashed banana. Add salt, cinnamon, and vanilla. Whisk for 1 minute until fully combined.",
},
      {safety:true, text:"BUDDY STEP — These pancakes need a grown-up at the pan. While they prepare, get your toppings ready.",
},
      {safety:true, text:"GROWN-UP — Heat a non-stick pan over LOW-MEDIUM heat — not high! Melt a small knob of butter gently.",
},
      {safety:true, text:"GROWN-UP — Pour 2 tablespoons of batter per pancake. Cook for 2 to 3 minutes until bubbles form across the surface and the edges look set and dry.",
},
      {safety:true, text:"GROWN-UP — Flip CAREFULLY and decisively with a thin spatula. Cook second side 1 to 2 minutes until golden.",
},
      {safety:false, text:"Stack the warm pancakes on a plate. Drizzle with honey and add fresh fruit. Serve warm.",
},
    ],
  },

  {
    id:39, name:"Vegetable Khichdi", hindi:"सब्जी खिचड़ी", emoji:"🍲",
    cuisine:"Pan-India", diet:"veg", level:"explorer", section:"kids",
    time:"20 mins", badge:"Khichdi King 🍲", tags:["healthy","comfort"],
    desc:"India's original superfood — rice and lentils with vegetables, one pot!",
    ingredients:["½ cup rice — washed","½ cup yellow moong dal — washed","½ cup mixed vegetables (peas, carrot, beans)","1 small onion — chopped","1 tomato — chopped","1 tsp cumin seeds","½ tsp turmeric","½ tsp red chilli powder","1 tsp ghee","Salt to taste","3 cups water","Coriander and lemon juice to finish"],
    steps:[
      {safety:false, text:"Wash hands. Wash the rice and moong dal together 2 to 3 times until the water runs clear. Drain and set aside.",
},
      {safety:false, text:"Chop all vegetables into small, even, consistent pieces — about ½ cm cubes.",
},
      {safety:true, text:"BUDDY STEP — Ask your grown-up to heat 1 tsp ghee in a pressure cooker or heavy pan over medium heat. Add cumin seeds.",
},
      {safety:true, text:"GROWN-UP — Add onion and cook 2 minutes. Add tomato, turmeric, and chilli powder. Cook 1 more minute.",
},
      {safety:true, text:"GROWN-UP — Add washed rice, dal, vegetables, salt, and 3 cups of water. Bring to a boil.",
},
      {safety:true, text:"GROWN-UP — Pressure cooker: cook for 3 whistles on medium heat. Or pot: cover and simmer 20 minutes, stirring every 5 minutes, until rice and dal are completely soft.",
},
      {safety:false, text:"Stir well. If too thick, add ½ cup hot water and stir through. Khichdi should be wetter than plain rice.",
},
      {safety:false, text:"Add a small dollop of ghee on top. Squeeze lemon juice and scatter coriander. Serve hot!",
},
    ],
  },

  {
    id:40, name:"Kanda Poha", hindi:"कांदा पोहा", emoji:"🍽️",
    cuisine:"Marathi", diet:"veg", level:"explorer", section:"kids",
    time:"15 mins", badge:"Poha Champion 🌟", tags:["marathi","quick"],
    desc:"Onion poha — the definitive Maharashtra breakfast, ready in minutes!",
    ingredients:["1.5 cups thick poha","2 medium onions — finely chopped","1 tsp mustard seeds","8 curry leaves","2 green chillies","½ tsp turmeric","1 tsp sugar","Salt to taste","1 tbsp oil","1 tbsp lemon juice","2 tbsp fresh coriander","2 tbsp roasted peanuts"],
    steps:[
      {safety:false, text:"Wash hands. Rinse poha in a colander under running water for 30 seconds. Let rest 5 minutes until soft.",
},
      {safety:false, text:"Sprinkle turmeric, sugar, and salt over the soft poha. Mix gently with a fork until uniformly golden.",
},
      {safety:true, text:"BUDDY STEP — Grown-up heats oil in a wide pan over medium heat. Add mustard seeds until they pop.",
},
      {safety:true, text:"GROWN-UP — Add curry leaves and green chillies — stand back! Cook 10 seconds. Add onions and cook 4 minutes until golden.",
},
      {safety:true, text:"GROWN-UP — Add the seasoned poha to the pan. Fold very gently 8 to 10 times. Turn off heat.",
},
      {safety:false, text:"Squeeze lemon juice all over. Add roasted peanuts and fresh coriander. Taste and adjust. Serve hot!",
},
    ],
  },

  // ── EXPLORER · NON-VEG ────────────────────────────────────────

  {
    id:41, name:"Egg Bhurji", hindi:"एग भुर्जी", emoji:"🍳",
    cuisine:"Pan-India", diet:"non-veg", level:"explorer", section:"kids",
    time:"10 mins", badge:"Bhurji Boss 🍳", tags:["breakfast","protein"],
    desc:"India's ultimate spiced scrambled eggs — fluffy, flavourful and ready in minutes!",
    ingredients:["3 eggs","1 small onion — finely chopped","1 tomato — finely chopped","1 green chilli — chopped (optional)","2 tbsp fresh coriander","¼ tsp turmeric","¼ tsp red chilli powder","½ tsp cumin seeds","Salt to taste","1 tsp oil or butter","Bread or roti to serve"],
    steps:[
      {safety:false, text:"Wash hands. Crack all 3 eggs into a bowl. Remove any shell fragments with wet fingers.",
},
      {safety:false, text:"Add salt, turmeric, and red chilli powder to the eggs. Beat with a fork for 30 seconds until completely uniform — no streaks of white.",
},
      {safety:true, text:"BUDDY STEP — Grown-up needed for the pan. Line up all your ingredients next to the stove in the order you'll use them.",
},
      {safety:true, text:"GROWN-UP — Heat 1 tsp oil in a pan over medium heat. Add cumin seeds and let them sizzle for 10 seconds.",
},
      {safety:true, text:"GROWN-UP — Add onions and cook for 2 minutes until soft and translucent.",
},
      {safety:true, text:"GROWN-UP — Add tomatoes and green chilli. Cook for 1 minute until tomatoes soften slightly.",
},
      {safety:true, text:"GROWN-UP — Pour the beaten egg mixture over the vegetables. Let it sit undisturbed for 5 seconds — then begin folding slowly.",
},
      {safety:true, text:"GROWN-UP — Continue folding on low heat. Remove from heat while eggs still look SLIGHTLY wet — residual heat finishes cooking them. Don't overcook!",
},
      {safety:false, text:"Scatter fresh coriander generously over the top. Serve IMMEDIATELY on hot buttered toast or roti.",
},
    ],
  },

  // ── EXPLORER · COLLEGE ────────────────────────────────────────

  {
    id:42, name:"Jeera Rice", hindi:"जीरा चावल", emoji:"🍚",
    cuisine:"North Indian", diet:"veg", level:"explorer", section:"college",
    time:"15 mins", badge:"Rice Royalty 🍚", tags:["rice","budget"],
    desc:"Fragrant cumin rice — pairs beautifully with any dal, curry, or sabzi!",
    ingredients:["1 cup basmati rice","2 tbsp ghee or butter","1 tsp cumin seeds (jeera)","1 bay leaf","2 cups water","Salt to taste","Fresh coriander to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Wash the rice 3 times until the water runs clear. Soak in clean water for 15 minutes.",
},
      {safety:true, text:"BUDDY STEP — Grown-up heats ghee in a heavy-bottomed pot over medium heat. Add cumin seeds and bay leaf. Cook until cumin turns golden — about 30 seconds.",
},
      {safety:true, text:"GROWN-UP — Drain the soaked rice and add to the pot. Stir gently for 1 minute to coat each grain in the ghee.",
},
      {safety:true, text:"GROWN-UP — Add 2 cups of water and salt. Bring to a full boil.",
},
      {safety:true, text:"GROWN-UP — Once boiling, reduce to the LOWEST heat. Cover tightly and cook undisturbed for 12 minutes. Do NOT lift the lid!",
},
      {safety:false, text:"After 12 minutes, remove from heat. Keep the lid on for 5 more minutes — this is called resting.",
},
      {safety:false, text:"Open and fluff the rice gently with a FORK — never a spoon. Garnish with coriander.",
},
    ],
  },

  {
    id:43, name:"Masoor Dal", hindi:"मसूर दाल", emoji:"🟠",
    cuisine:"North Indian", diet:"veg", level:"explorer", section:"college",
    time:"20 mins", badge:"Dal Dynamo 🟠", tags:["dal","protein"],
    desc:"Quick red lentil dal — ready in 20 minutes, packed with protein!",
    ingredients:["1 cup masoor dal (red lentils) — washed","1 onion — chopped","2 tomatoes — chopped","1 tsp ginger-garlic paste","1 tsp cumin seeds","½ tsp turmeric","1 tsp red chilli powder","1 tsp coriander powder","Salt to taste","2 tbsp oil","3 cups water","Fresh coriander and lemon juice to finish"],
    steps:[
      {safety:false, text:"Wash the masoor dal 2 times until the water runs clear. Drain and set aside.",
},
      {safety:true, text:"BUDDY STEP — Grown-up heats 2 tbsp oil in a heavy pan over medium heat. Add cumin seeds and cook 15 seconds.",
},
      {safety:true, text:"GROWN-UP — Add chopped onions. Cook on medium heat for 5 minutes until golden, stirring regularly.",
},
      {safety:true, text:"GROWN-UP — Add ginger-garlic paste. Cook for 2 minutes until the raw smell is completely gone.",
},
      {safety:true, text:"GROWN-UP — Add chopped tomatoes, turmeric, red chilli, and coriander powder. Cook for 3 minutes until tomatoes soften and oil begins to separate.",
},
      {safety:true, text:"GROWN-UP — Add washed masoor dal and 3 cups of water. Bring to a boil, then reduce to a gentle simmer.",
},
      {safety:true, text:"GROWN-UP — Simmer uncovered for 12 to 15 minutes, stirring every 5 minutes, until dal is completely soft and thickened.",
},
      {safety:false, text:"Taste and adjust salt. Squeeze lemon juice over and add fresh coriander. Serve with rice or roti.",
},
    ],
  },

  {
    id:44, name:"Aloo Sabzi", hindi:"आलू सब्जी", emoji:"🥔",
    cuisine:"North Indian", diet:"veg", level:"explorer", section:"college",
    time:"15 mins", badge:"Aloo Ace 🥔", tags:["budget","sabzi"],
    desc:"Simple spiced potatoes — the most reliable, budget-friendly Indian dish ever!",
    ingredients:["4 medium potatoes — boiled, peeled, cubed","1 onion — chopped","1 tomato — chopped","1 tsp cumin seeds","½ tsp turmeric","1 tsp coriander powder","½ tsp red chilli powder","½ tsp garam masala","Salt to taste","2 tbsp oil","Fresh coriander to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Boil the potatoes until completely soft — a knife slides in with zero resistance. Cool, peel, and cube them.",
},
      {safety:true, text:"BUDDY STEP — Grown-up heats 2 tbsp oil in a pan over medium heat. Add cumin seeds and cook 15 seconds.",
},
      {safety:true, text:"GROWN-UP — Add onions and cook for 4 minutes until golden. Add tomatoes and cook 2 more minutes.",
},
      {safety:true, text:"GROWN-UP — Add all spices: turmeric, coriander powder, red chilli, and salt. Cook for 1 minute.",
},
      {safety:true, text:"GROWN-UP — Add the boiled potato cubes. Mix gently and cook on medium-high for 3 to 4 minutes until potatoes are coated and edges are slightly crispy.",
},
      {safety:false, text:"Add garam masala. Taste and adjust all seasoning. Garnish with fresh coriander. Serve hot!",
},
    ],
  },

  {
    id:45, name:"One-Pot Pasta", hindi:"पास्ता", emoji:"🍝",
    cuisine:"Western", diet:"veg", level:"explorer", section:"college",
    time:"20 mins", badge:"Pasta Prince 🍝", tags:["western","minimal"],
    desc:"One pot, minimal dishes, maximum taste — the ultimate college meal!",
    ingredients:["200g pasta (penne, fusilli, or spaghetti)","2 cups tomato passata or crushed tomatoes","1 onion — finely chopped","4 cloves garlic — minced","1 tsp Italian seasoning or dried oregano","½ tsp red chilli flakes","2 tbsp olive oil","2.5 cups water","Salt to taste","Parmesan or any cheese to serve"],
    steps:[
      {safety:false, text:"Wash hands. Prepare ALL ingredients before turning on the heat — this dish moves fast!",
},
      {safety:true, text:"BUDDY STEP — Grown-up heats 2 tbsp olive oil in your LARGEST pot over medium heat. Add onions and cook 3 minutes.",
},
      {safety:true, text:"GROWN-UP — Add garlic and cook for 1 minute, stirring. Don't let the garlic burn!",
},
      {safety:true, text:"GROWN-UP — Add tomato passata, Italian seasoning, chilli flakes, and salt. Cook and stir for 2 minutes.",
},
      {safety:true, text:"GROWN-UP — Add 2.5 cups water and bring the whole mixture to a boil. Add dry pasta and stir immediately.",
},
      {safety:true, text:"GROWN-UP — Cook uncovered at a vigorous simmer for the time on the packet, stirring every 2 minutes. The pasta absorbs the sauce as it cooks!",
},
      {safety:false, text:"Test the pasta — it should be cooked but still slightly firm (al dente). Taste and adjust seasoning.",
},
      {safety:false, text:"Serve immediately in bowls. Top with grated cheese.",
},
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 👑  CHEF BOSS  ·  ADULT ON DECK  ·  REAL FIRE
  // ──────────────────────────────────────────────────────────────

  {
    id:50, name:"Aloo Paratha", hindi:"आलू पराठा", emoji:"🫓",
    cuisine:"North Indian", diet:"veg", level:"boss", section:"kids",
    time:"35 mins", badge:"Paratha Master 👨‍🍳", tags:["breakfast","north"],
    desc:"Punjab's iconic stuffed flatbread — crispy outside, perfectly spiced potato inside!",
    ingredients:["2 cups whole wheat flour (atta) plus extra for dusting","¾ cup warm water (approximately)","½ tsp salt for the dough","3 medium potatoes — boiled and mashed COMPLETELY smooth","1 tsp cumin seeds","1 tsp coriander powder","½ tsp red chilli powder","½ tsp garam masala","1 tsp amchur (dry mango powder)","2 green chillies — finely chopped","3 tbsp fresh coriander — finely chopped","Salt for filling","Generous ghee or butter for cooking"],
    steps:[
      {safety:false, text:"Wash hands. Mix atta with ½ tsp salt. Add warm water gradually and knead for 8 full minutes until smooth and soft like a soft earlobe.",
},
      {safety:false, text:"Cover the dough with a damp cloth and rest for 15 minutes. Do NOT skip this rest!",
},
      {safety:false, text:"Mash the boiled potatoes COMPLETELY smooth in a bowl — zero lumps allowed. Any lump will tear the paratha when rolling.",
},
      {safety:false, text:"Add ALL filling spices to the mashed potato: cumin, coriander powder, red chilli, garam masala, amchur, green chilli, coriander, and salt. Mix thoroughly. TASTE it — it should be bold and flavourful.",
},
      {safety:false, text:"Divide the rested dough into 6 equal golf-ball sized portions. Roll each into a smooth ball between your palms.",
},
      {safety:false, text:"Flatten one ball with your palm. Roll into a circle about 12 cm wide. Dust with flour if it sticks.",
},
      {safety:false, text:"Place 2 to 3 tablespoons of filling in the centre of the circle — not too much!",
},
      {safety:false, text:"Gather the dough edges up around the filling. Pinch firmly together at the top. Seal with NO gaps.",
},
      {safety:false, text:"Gently flatten the stuffed ball with your palm. Roll carefully back into a flat paratha about 5 mm thick.",
},
      {safety:true, text:"GROWN-UP — Heat the tawa over HIGH heat until very hot. Place the paratha on the dry tawa. Cook for 1 minute until bubbles form.",
},
      {safety:true, text:"GROWN-UP — Flip the paratha. Apply ghee generously on the cooked side with a spoon.",
},
      {safety:true, text:"GROWN-UP — Flip again. Apply ghee on this side too. Press firmly with spatula. Cook until BOTH sides are golden brown with dark spots.",
},
      {safety:false, text:"Serve IMMEDIATELY with yogurt, pickle, and a generous dollop of fresh butter on top!",
},
    ],
  },

  {
    id:51, name:"Dal Tadka", hindi:"दाल तड़का", emoji:"🟡",
    cuisine:"North Indian", diet:"veg", level:"boss", section:"kids",
    time:"25 mins", badge:"Dal Deva 🟡", tags:["dal","north"],
    desc:"Golden tempered lentils — every Indian home's most beloved comfort food!",
    ingredients:["1 cup yellow moong dal or toor dal — washed","1 onion — finely chopped","2 tomatoes — chopped","1 tsp ginger-garlic paste","1 tsp cumin seeds","½ tsp turmeric","1 tsp coriander powder","½ tsp red chilli powder","½ tsp garam masala","Salt to taste","3 cups water","For tadka: 2 tbsp ghee, 1 tsp cumin seeds, 3 dried red chillies, pinch of hing"],
    steps:[
      {safety:false, text:"Wash the dal 3 times until the water runs clear. Drain well.",
},
      {safety:true, text:"GROWN-UP — Pressure cook the dal with 3 cups water and turmeric for 3 whistles on medium heat. Or simmer in a covered pot for 20 minutes until completely soft.",
},
      {safety:false, text:"Once cooked, whisk or mash the dal lightly with the back of a spoon — creamy but not completely smooth.",
},
      {safety:true, text:"GROWN-UP — Heat 1 tbsp oil in a separate pan. Cook onions for 5 minutes until golden. Add ginger-garlic paste and cook 2 more minutes.",
},
      {safety:true, text:"GROWN-UP — Add tomatoes and spices except garam masala. Cook 4 minutes until oil separates. Pour masala into the cooked dal. Add garam masala. Simmer 5 minutes.",
},
      {safety:true, text:"GROWN-UP — Final tadka: heat 2 tbsp ghee until smoking hot. Add cumin seeds, dried red chillies, and hing. Pour IMMEDIATELY over the dal — the entire smoking hot tadka!",
},
      {safety:false, text:"Squeeze lemon juice over the top. Garnish with fresh coriander. Serve with steamed rice or roti!",
},
    ],
  },

  {
    id:52, name:"Dosa", hindi:"डोसा", emoji:"🌯",
    cuisine:"South Indian", diet:"veg", level:"boss", section:"kids",
    time:"20 mins (from readymade batter)", badge:"Dosa Diva 🌯", tags:["breakfast","south"],
    desc:"Golden, paper-thin, crispy dosa — the pride and joy of South India!",
    ingredients:["2 cups readymade dosa batter","Salt to taste","Oil or ghee for the tawa"],
    steps:[
      {safety:false, text:"Wash hands. Remove the dosa batter from the fridge 30 minutes before cooking.",
},
      {safety:false, text:"Stir the batter well from the bottom. Check: it should flow like thin cream — not thick porridge, not watery.",
},
      {safety:false, text:"Taste the batter. Add salt only if needed. Mix with just 3 to 4 gentle folds — don't overbeat!",
},
      {safety:true, text:"GROWN-UP — Heat the tawa or large flat pan on HIGH flame for 2 to 3 minutes until extremely hot. Test: sprinkle water drops — they should sizzle and vanish instantly.",
},
      {safety:true, text:"GROWN-UP — Rub the hot tawa surface with a halved onion dipped in oil. This seasons the tawa.",
},
      {safety:true, text:"GROWN-UP — Pour one ladle of batter in the very centre of the hot tawa. IMMEDIATELY spread in concentric circles outward using the back of the ladle — work QUICKLY!",
},
      {safety:true, text:"GROWN-UP — Drizzle oil all around the edges and a few drops on top. Reduce to medium-high heat and cook without touching.",
},
      {safety:true, text:"GROWN-UP — Cook until the edges naturally lift off the tawa and turn golden brown. The surface should look completely dry.",
},
      {safety:true, text:"GROWN-UP — Slide a thin spatula under from the edges. Fold in half or roll. Slide onto a warm plate IMMEDIATELY.",
},
    ],
  },

  {
    id:53, name:"Sambar", hindi:"सांभर", emoji:"🟤",
    cuisine:"South Indian", diet:"veg", level:"boss", section:"kids",
    time:"30 mins", badge:"Sambar Sage 🟤", tags:["south","dal"],
    desc:"Tangy vegetable and lentil stew — idli and dosa's essential best friend!",
    ingredients:["¾ cup toor dal — washed","2 cups mixed vegetables (drumstick, carrot, potato, brinjal) cut large","1 tomato — quartered","1 small onion — quartered","2 tbsp sambar powder (readymade is perfectly fine!)","1 tsp tamarind paste","Salt to taste","For tadka: 2 tbsp oil, 1 tsp mustard seeds, ½ tsp cumin seeds, curry leaves, 2 dried red chillies, pinch of hing"],
    steps:[
      {safety:false, text:"Wash hands. Wash the toor dal 3 times. Wash and cut all vegetables into large 4 to 5 cm pieces.",
},
      {safety:true, text:"GROWN-UP — Pressure cook the toor dal with 2.5 cups water and ½ tsp turmeric for 4 whistles. Let pressure release naturally.",
},
      {safety:false, text:"Once the pressure has fully released, open and whisk the cooked dal smooth.",
},
      {safety:true, text:"GROWN-UP — In a large pot, heat 1 tbsp oil. Add the vegetables, onion, and tomato. Sauté for 3 minutes.",
},
      {safety:true, text:"GROWN-UP — Add sambar powder, tamarind paste, and salt. Add enough water to cover vegetables. Bring to a boil and simmer 15 minutes until vegetables are cooked.",
},
      {safety:true, text:"GROWN-UP — Pour the whisked cooked toor dal into the simmering vegetables. Stir well. Simmer together for 5 minutes.",
},
      {safety:true, text:"GROWN-UP — Make the final tadka: heat 2 tbsp oil until smoking. Add mustard seeds, cumin seeds, curry leaves, dried red chillies, and hing. Pour smoking hot over the sambar!",
},
      {safety:false, text:"Stir the tadka through. Taste and adjust salt. Serve hot with idli, dosa, or steamed rice!",
},
    ],
  },

  {
    id:54, name:"Gujarati Kadhi", hindi:"गुजराती कढ़ी", emoji:"🟡",
    cuisine:"Gujarati", diet:"veg", level:"boss", section:"kids",
    time:"20 mins", badge:"Kadhi Queen 🟡", tags:["gujarati","yogurt"],
    desc:"Sweet, tangy yogurt curry — uniquely Gujarati, utterly delicious!",
    ingredients:["1.5 cups thick yogurt","3 cups water","3 tbsp besan (chickpea flour)","1 tbsp sugar — this is what makes Gujarati kadhi different!","Salt to taste","½ tsp turmeric","For tadka: 1 tbsp ghee, 1 tsp mustard seeds, ½ tsp cumin seeds, 8 curry leaves, 2 dried red chillies, pinch of hing, ½ tsp grated ginger"],
    steps:[
      {safety:false, text:"Wash hands. Whisk together yogurt, water, besan, sugar, turmeric, and salt in a large bowl until COMPLETELY smooth — no lumps.",
},
      {safety:false, text:"Taste the raw mixture — it should be pleasantly sour, mildly sweet, and well-salted. Adjust now before cooking.",
},
      {safety:true, text:"GROWN-UP — Pour the kadhi mixture into a heavy-bottomed pan. Heat on medium, stirring CONSTANTLY, until it comes to a boil.",
},
      {safety:true, text:"GROWN-UP — Once boiling, reduce to low heat and simmer for 5 minutes, stirring every 30 seconds. The kadhi will thicken slightly.",
},
      {safety:true, text:"GROWN-UP — Make the tadka: heat ghee until smoking hot. Add mustard seeds until they pop. Add cumin, curry leaves, red chillies, hing, and ginger. Pour immediately over the kadhi.",
},
      {safety:false, text:"Stir the tadka through the kadhi. Taste and adjust sweet-sour balance. Serve hot with khichdi or rice!",
},
    ],
  },

  {
    id:55, name:"Misal Pav", hindi:"मिसळ पाव", emoji:"🍲",
    cuisine:"Marathi", diet:"veg", level:"boss", section:"kids",
    time:"30 mins", badge:"Misal Master 🍲", tags:["marathi","spicy"],
    desc:"Spicy sprouted curry with bread — Pune's most famous and beloved street food!",
    ingredients:["2 cups sprouted moth beans or mixed sprouts","1 large onion — finely chopped","2 tomatoes — finely chopped","1 tsp ginger-garlic paste","2 tbsp oil","1 tsp mustard seeds","8 curry leaves","2 tsp red chilli powder (Kolhapuri if available)","1 tsp coriander powder","½ tsp turmeric","Salt to taste","Toppings: chopped onion, coriander, lemon wedges, farsan (crispy mixture)","Pav (soft dinner rolls) to serve"],
    steps:[
      {safety:false, text:"Wash hands. Rinse the sprouted beans well under cold water.",
},
      {safety:true, text:"GROWN-UP — Heat oil in a pot over medium heat. Add mustard seeds until they pop. Add curry leaves.",
},
      {safety:true, text:"GROWN-UP — Add onions and cook 5 minutes until golden. Add ginger-garlic paste and cook 2 more minutes.",
},
      {safety:true, text:"GROWN-UP — Add tomatoes, all spices, and salt. Cook for 4 to 5 minutes until oil separates.",
},
      {safety:true, text:"GROWN-UP — Add the sprouted beans and 1.5 cups water. Bring to a boil. Reduce heat, cover, and simmer for 12 to 15 minutes.",
},
      {safety:false, text:"Taste the misal and adjust spice level and salt. It should be spicy, complex, and satisfying.",
},
      {safety:false, text:"Serve: ladle misal into bowls. Top with chopped raw onion, coriander, lemon squeeze, and farsan for crunch. Serve with pav.",
},
    ],
  },

  {
    id:56, name:"Paneer Bhurji", hindi:"पनीर भुर्जी", emoji:"🧀",
    cuisine:"North Indian", diet:"veg", level:"boss", section:"kids",
    time:"15 mins", badge:"Paneer Pro 🧀", tags:["north","protein"],
    desc:"Crumbled spiced paneer — quick, protein-rich and utterly delicious!",
    ingredients:["250g paneer — crumbled","1 onion — finely chopped","2 tomatoes — finely chopped","1 tsp ginger-garlic paste","½ tsp cumin seeds","½ tsp turmeric","1 tsp coriander powder","½ tsp red chilli powder","½ tsp garam masala","Salt to taste","1 tbsp oil","Fresh coriander and lemon juice to finish"],
    steps:[
      {safety:false, text:"Wash hands. Crumble the paneer by breaking it between your fingers into small, coarse pieces.",
},
      {safety:true, text:"GROWN-UP — Heat oil in a pan over medium heat. Add cumin seeds and cook 15 seconds until aromatic.",
},
      {safety:true, text:"GROWN-UP — Add onions and cook 4 to 5 minutes until properly golden.",
},
      {safety:true, text:"GROWN-UP — Add ginger-garlic paste (cook 2 mins), then tomatoes and all spices except garam masala. Cook 3 to 4 minutes until oil separates.",
},
      {safety:true, text:"GROWN-UP — Add the crumbled paneer. Stir gently to combine. Cook on medium heat for 3 minutes.",
},
      {safety:false, text:"Add garam masala. Taste and adjust all seasoning. Squeeze lemon juice and scatter coriander. Serve immediately!",
},
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 🎓  KITCHEN SURVIVAL  ·  COLLEGE MODE
  // ──────────────────────────────────────────────────────────────

  {
    id:70, name:"Rajma", hindi:"राजमा", emoji:"🫘",
    cuisine:"North Indian", diet:"veg", level:"survival", section:"college",
    time:"30 mins (with canned beans)", badge:"Rajma Raja 🫘", tags:["batch","protein"],
    desc:"Hearty kidney bean curry — batch cook Sunday, eat all week like a king!",
    ingredients:["2 cans kidney beans (400g each) — OR 1 cup dried beans soaked overnight and pressure cooked","1 large onion — finely chopped","2 tomatoes — pureed or grated","1 tsp ginger-garlic paste","1 tsp cumin seeds","1 bay leaf","1 tsp coriander powder","1 tsp red chilli powder","½ tsp turmeric","1 tsp garam masala","1 tsp amchur or 1 tbsp lemon juice","Salt to taste","2 tbsp oil","Fresh coriander to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Open canned kidney beans, drain completely in a colander, and rinse thoroughly under running water for 30 seconds.",
},
      {safety:false, text:"Get EVERYTHING ready before starting — chop onion, puree tomatoes, open spices. This is called mise en place.",
},
      {safety:true, text:"BUDDY STEP — Grown-up heats 2 tbsp oil in a heavy pot over medium heat. Add cumin seeds and bay leaf. Cook 15 seconds.",
},
      {safety:true, text:"GROWN-UP — Add onions and cook on medium heat for 8 to 10 minutes until DEEP golden brown. Stir every minute. Do NOT rush with high heat!",
},
      {safety:true, text:"GROWN-UP — Add ginger-garlic paste. Cook for 2 minutes until the raw smell completely disappears.",
},
      {safety:true, text:"GROWN-UP — Add tomato puree, coriander powder, red chilli powder, and turmeric. Cook for 5 to 6 minutes until oil separates from the masala.",
},
      {safety:true, text:"GROWN-UP — Add the drained kidney beans and 1 cup water. Stir well. Bring to a boil.",
},
      {safety:true, text:"GROWN-UP — Reduce heat to low. Cover and simmer for 10 to 15 minutes. Stir every 5 minutes.",
},
      {safety:false, text:"Use the back of a spoon to mash 5 to 6 beans against the side of the pot. Stir the mashed beans through the curry — this thickens the gravy naturally.",
},
      {safety:false, text:"Add garam masala and amchur. TASTE carefully and adjust every element of seasoning.",
},
      {safety:false, text:"Garnish with fresh coriander. Serve with steamed rice. Stores in fridge for 4 days — batch cook for the week!",
},
    ],
  },

  {
    id:71, name:"Palak Dal", hindi:"पालक दाल", emoji:"🟢",
    cuisine:"North Indian", diet:"veg", level:"survival", section:"college",
    time:"25 mins", badge:"Palak Pro 🟢", tags:["iron","healthy"],
    desc:"Iron-rich spinach and lentil dal — budget superfood for college life!",
    ingredients:["¾ cup masoor or toor dal — washed","2 cups spinach (palak) — washed thoroughly and roughly chopped","1 onion — chopped","2 tomatoes — chopped","1 tsp ginger-garlic paste","½ tsp turmeric","1 tsp cumin-coriander powder","½ tsp red chilli powder","Salt to taste","1 tbsp oil","1 tsp ghee","1 tsp cumin seeds","Coriander and lemon juice to finish"],
    steps:[
      {safety:false, text:"Wash hands. Wash the dal 3 times until water runs clear. Wash spinach VERY thoroughly — spinach carries grit.",
},
      {safety:true, text:"GROWN-UP — Pressure cook the dal with 2.5 cups water and turmeric for 3 whistles. Let pressure release naturally.",
},
      {safety:true, text:"GROWN-UP — In a separate pot, heat oil, add cumin seeds, then onions. Cook 5 minutes until golden.",
},
      {safety:true, text:"GROWN-UP — Add ginger-garlic paste (cook 2 mins), then tomatoes and all spices. Cook 4 minutes until oil separates.",
},
      {safety:true, text:"GROWN-UP — Add the washed spinach to the masala. Stir well. Cook for 2 minutes — spinach will wilt dramatically.",
},
      {safety:true, text:"GROWN-UP — Add the cooked dal to the spinach masala. Stir well. Simmer together for 5 minutes.",
},
      {safety:false, text:"Add a teaspoon of ghee, taste and adjust all seasoning. Add lemon juice and coriander. Serve hot!",
},
    ],
  },

  {
    id:72, name:"Tomato Soup", hindi:"टमाटर सूप", emoji:"🍅",
    cuisine:"Pan-India", diet:"veg", level:"survival", section:"college",
    time:"20 mins", badge:"Soup Star 🍅", tags:["soup","comfort"],
    desc:"Homemade tomato soup from scratch — comfort food on a college budget!",
    ingredients:["6 ripe tomatoes — roughly chopped","1 small onion — roughly chopped","4 cloves garlic — peeled","1 tsp butter or oil","1 tsp sugar","½ tsp black pepper","Salt to taste","1 cup water or vegetable stock","3 tbsp fresh cream or milk (optional)","Fresh basil or coriander to garnish","Bread for dipping"],
    steps:[
      {safety:false, text:"Wash hands. Roughly chop the tomatoes, onion, and peel the garlic — neat cuts are unnecessary, everything gets blended!",
},
      {safety:true, text:"GROWN-UP — Heat butter in a pot over medium heat. Add onions and garlic. Cook for 4 minutes until soft.",
},
      {safety:true, text:"GROWN-UP — Add chopped tomatoes. Cook for 5 minutes on medium heat, stirring regularly, until they completely break down.",
},
      {safety:true, text:"GROWN-UP — Add water, sugar, salt, and pepper. Bring to a boil. Reduce heat and simmer for 10 minutes.",
},
      {safety:true, text:"GROWN-UP — Remove from heat, cool slightly, then CAREFULLY blend the soup until completely smooth.",
},
      {safety:false, text:"Taste carefully and adjust all seasoning — this is the most important step!",
},
      {safety:false, text:"Serve in bowls with a swirl of cream, fresh herbs, and bread for dipping. Stores in fridge for 3 days.",
},
    ],
  },

  {
    id:73, name:"Chicken Rice Bowl", hindi:"चिकन राइस बाउल", emoji:"🍗",
    cuisine:"Western", diet:"non-veg", level:"survival", section:"college",
    time:"20 mins", badge:"Bowl Boss 🍗", tags:["protein","quick"],
    desc:"Simple teriyaki-style chicken rice bowl — complete meal in one bowl!",
    ingredients:["200g boneless chicken — cut into bite-sized pieces","1 cup cooked rice (use leftover rice!)","2 tbsp soy sauce","1 tbsp honey","1 tsp garlic — minced","1 tsp ginger — grated","1 tsp sesame oil (or regular oil)","1 tsp oil for cooking","Salt and pepper","Sesame seeds and spring onion to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Make the marinade: mix soy sauce, honey, garlic, ginger, and sesame oil in a bowl.",
},
      {safety:false, text:"Add the chicken pieces to the marinade. Mix well and let it sit for 5 minutes minimum.",
},
      {safety:true, text:"GROWN-UP — Heat 1 tsp oil in a pan over medium-high heat until very hot. Add marinated chicken in a SINGLE LAYER.",
},
      {safety:true, text:"GROWN-UP — Cook without touching for 3 minutes to develop caramelisation. Then flip and cook 2 more minutes.",
},
      {safety:true, text:"GROWN-UP — Pour any remaining marinade over the chicken. Let it bubble and coat — 1 minute.",
},
      {safety:false, text:"Check chicken is cooked through — no pink inside. Season with salt and pepper if needed.",
},
      {safety:false, text:"Build your bowl: rice at the bottom, glazed chicken on top. Garnish with sesame seeds and sliced spring onion.",
},
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 🌟  SPECIALS
  // ──────────────────────────────────────────────────────────────

  {
    id:80, name:"No-Bake Birthday Cake", hindi:"बर्थडे केक", emoji:"🎂",
    cuisine:"Western", diet:"veg", level:"starter", section:"special-birthday",
    time:"30 mins + 4 hours chilling", badge:"Cake Creator 🎂", tags:["birthday"],
    desc:"Gorgeous no-bake Oreo birthday cake — no oven needed, maximum wow factor!",
    ingredients:["30 Oreo or chocolate sandwich biscuits","250g cream cheese — at room temperature","1 cup whipping cream","½ cup icing sugar","1 tsp vanilla essence","100g chocolate chips","2 tbsp butter","Colourful sprinkles and birthday candles for decoration"],
    steps:[
      {safety:false, text:"Wash hands thoroughly. Twist all Oreos open and separate biscuit halves from cream halves into two separate bowls.",
},
      {safety:false, text:"Seal the biscuit halves in a zip-lock bag and crush with a rolling pin until fine crumbs — no large pieces.",
},
      {safety:false, text:"Melt 2 tbsp butter. Mix the melted butter into the biscuit crumbs until it resembles damp sand. Press firmly into the bottom of a tin. Refrigerate 15 minutes.",
},
      {safety:false, text:"Beat cream cheese with icing sugar and vanilla for 2 minutes until completely smooth and fluffy — no lumps at all.",
},
      {safety:false, text:"In a separate COLD bowl, whip the cream until soft peaks form — about 3 to 4 minutes. Don't overwhip!",
},
      {safety:false, text:"GENTLY fold the whipped cream into the cream cheese with a spatula — fold, do NOT stir! Stirring destroys the airiness.",
},
      {safety:false, text:"Roughly crush the remaining Oreos — including cream halves — into chunky bite-sized pieces. Fold into the cream filling.",
},
      {safety:false, text:"Spread the Oreo cream filling evenly over the chilled biscuit base. Smooth the top.",
},
      {safety:false, text:"Melt chocolate chips with 1 tbsp butter in the microwave in 30-second bursts. Cool 2 minutes. Drizzle artistically over the top.",
},
      {safety:false, text:"Decorate with sprinkles and birthday candles. Refrigerate for MINIMUM 4 hours — overnight is better — before serving.",
},
    ],
  },

  {
    id:81, name:"Chocolate Mousse", hindi:"चॉकलेट मूस", emoji:"🍫",
    cuisine:"Western", diet:"veg", level:"starter", section:"special-birthday",
    time:"20 mins + 2 hours chilling", badge:"Mousse Maestro 🍫", tags:["dessert"],
    desc:"Airy, rich chocolate mousse — elegant enough for the fanciest birthday!",
    ingredients:["200g dark chocolate — broken into pieces","3 eggs — separated into yolks and whites","3 tbsp sugar","1 cup whipping cream","1 tsp vanilla essence","Pinch of salt","Chocolate shavings or berries to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Separate 3 eggs carefully — yolks in one bowl, whites in another. NOT EVEN A DROP of yolk in the whites!",
},
      {safety:true, text:"GROWN-UP — Melt the chocolate: place in a heatproof bowl over a pot of barely simmering water. Stir until melted. Cool slightly until just warm.",
},
      {safety:false, text:"Add egg yolks ONE AT A TIME to the warm — not hot — chocolate, whisking after each addition.",
},
      {safety:false, text:"Add vanilla essence and whisk through. Set the chocolate mixture aside.",
},
      {safety:false, text:"Whip the cream in a cold bowl until soft peaks form — about 3 minutes.",
},
      {safety:false, text:"Add a pinch of salt to the egg whites and whisk until STIFF peaks form — peaks should stand straight up.",
},
      {safety:false, text:"Add the sugar to the stiff egg whites and whisk 30 more seconds to make a glossy meringue.",
},
      {safety:false, text:"Fold the whipped cream into the chocolate in 5 to 6 large, gentle strokes.",
},
      {safety:false, text:"Fold the meringue into the mixture in THREE separate additions — gently each time. Preserve the airy texture!",
},
      {safety:false, text:"Spoon into individual glasses. Refrigerate for minimum 2 hours until set.",
},
    ],
  },

  {
    id:82, name:"BBQ Masala Corn", hindi:"भुट्टा", emoji:"🌽",
    cuisine:"Pan-India", diet:"veg", level:"boss", section:"special-dad",
    time:"20 mins", badge:"Grill Guru 🌽", tags:["dad","outdoor"],
    desc:"Grilled masala corn with lemon, chilli and salt — perfect outdoor cooking with Dad!",
    ingredients:["4 fresh corn on the cob — husks removed","1 lemon — halved","2 tsp red chilli powder","1 tsp chaat masala","½ tsp black salt","Butter to spread","Pinch of regular salt"],
    steps:[
      {safety:false, text:"Wash hands. Remove all the green husks and silky threads from each corn cob.",
},
      {safety:false, text:"Mix chilli powder, chaat masala, and black salt together in a small bowl to make the masala mix.",
},
      {safety:true, text:"GROWN-UP / DAD STEP — Grill the corn on a hot barbecue, open flame, or cast iron pan, turning every 2 minutes, until charred in spots all around — about 8 to 10 minutes.",
},
      {safety:false, text:"While the corn is still HOT, immediately rub each cob with the cut side of the lemon half.",
},
      {safety:false, text:"Immediately spread butter over the hot corn — it will melt instantly.",
},
      {safety:false, text:"Generously sprinkle the masala mix all over the corn. Serve immediately — eat with your hands!",
},
    ],
  },

  {
    id:83, name:"Mum's Kheer", hindi:"खीर", emoji:"🍮",
    cuisine:"North Indian", diet:"veg", level:"boss", section:"special-mom",
    time:"40 mins", badge:"Kheer King 🍮", tags:["mom","sweet"],
    desc:"Creamy, fragrant rice pudding — make Mum her absolute favourite sweet!",
    ingredients:["1 litre full-fat milk — do NOT use low-fat for kheer","¼ cup basmati rice — washed","½ cup sugar","¼ tsp cardamom powder","8 to 10 saffron strands soaked in 2 tbsp warm milk for 5 minutes","2 tbsp mixed almonds and pistachios — finely chopped","1 tbsp raisins","1 tsp rose water (optional)"],
    steps:[
      {safety:false, text:"Wash the rice 3 times until the water runs clear. Soak in fresh water for 15 minutes.",
},
      {safety:false, text:"Soak saffron strands in 2 tbsp warm milk for 5 minutes. Watch them turn the milk golden. Chop almonds and pistachios finely.",
},
      {safety:true, text:"GROWN-UP — Pour the full litre of full-fat milk into the HEAVIEST pot you have. Heat on medium flame — watch it CONSTANTLY!",
},
      {safety:true, text:"GROWN-UP — The moment milk starts boiling, reduce to the LOWEST heat. Add the drained rice. Stir immediately.",
},
      {safety:true, text:"GROWN-UP — Simmer on LOWEST heat for 25 to 30 minutes, stirring EVERY 3 to 4 minutes without fail.",
},
      {safety:true, text:"GROWN-UP — After 25 minutes, test the rice — completely soft with zero firmness. The kheer should be the consistency of thin porridge. NOW add the sugar.",
},
      {safety:true, text:"GROWN-UP — Add cardamom powder and saffron milk. Stir well. Taste and adjust sweetness.",
},
      {safety:true, text:"GROWN-UP — Remove from heat. Add raisins and half the chopped nuts. Add rose water if using.",
},
      {safety:false, text:"Pour into a beautiful serving bowl. Decorate with remaining nuts in a pattern and a few saffron strands. Cool, then refrigerate.",
},
    ],
  },

  {
    id:84, name:"Instant Rasmalai", hindi:"रसमलाई", emoji:"🥛",
    cuisine:"Bengali", diet:"veg", level:"starter", section:"special-mom",
    time:"10 mins + 1 hour soaking", badge:"Sweet Star 🥛", tags:["mom","sweet"],
    desc:"Effortless cheat rasmalai — turns store-bought rasgulla into a stunning sweet!",
    ingredients:["1 can (500g) rasgulla in sugar syrup","1 cup full-fat milk","2 tbsp condensed milk or sugar","¼ tsp cardamom powder","A few drops rose water","A few saffron strands soaked in 1 tsp warm milk","2 tbsp chopped pistachios for garnish"],
    steps:[
      {safety:false, text:"Wash hands. Open the rasgulla can. Gently squeeze each rasgulla between your palms over the sink to remove most of the sugar syrup.",
},
      {safety:false, text:"Place all squeezed rasgullas in a flat dish in a single layer.",
},
      {safety:false, text:"In a bowl, combine milk, condensed milk, cardamom powder, rose water, and saffron milk. Mix well.",
},
      {safety:false, text:"Taste the flavoured milk and adjust — more condensed milk if not sweet enough, more cardamom for more fragrance.",
},
      {safety:false, text:"Pour the flavoured milk over the rasgullas — they should be fully submerged.",
},
      {safety:false, text:"Refrigerate for at least 1 hour. The rasgullas absorb the flavoured milk and become proper rasmalai.",
},
      {safety:false, text:"Serve chilled in a beautiful bowl. Scatter chopped pistachios on top for crunch and colour.",
},
    ],
  },

  {
    id:85, name:"Christmas Cake Balls", hindi:"केक बॉल्स", emoji:"🎄",
    cuisine:"Western", diet:"veg", level:"starter", section:"special-christmas",
    time:"30 mins", badge:"Festive Chef 🎄", tags:["festive"],
    desc:"Festive no-bake cake balls rolled in coconut — a joyful Christmas treat!",
    ingredients:["200g readymade pound cake or chocolate cake — crumbled","3 tbsp cream cheese or condensed milk","1 tbsp cocoa powder","½ tsp vanilla essence","1 cup desiccated coconut for rolling","Red and green food colouring for the coconut (optional)","Sprinkles for decoration"],
    steps:[
      {safety:false, text:"Wash hands. Crumble the cake completely into fine crumbs in a large bowl — press with your fingers or use a fork.",
},
      {safety:false, text:"Add cream cheese or condensed milk, cocoa powder, and vanilla to the crumbs. Mix with your hands until it comes together into a dough-like mixture.",
},
      {safety:false, text:"Roll a tablespoon of the mixture between your palms into a smooth ball. Repeat until all the mixture is used.",
},
      {safety:false, text:"Optional: colour some desiccated coconut red and some green using food colouring. Mix the colouring through thoroughly.",
},
      {safety:false, text:"Roll each cake ball in the coloured or plain desiccated coconut until completely coated all around.",
},
      {safety:false, text:"Decorate each ball with a sprinkle or a tiny candy on top. Refrigerate for 30 minutes to firm up before serving.",
},
    ],
  },

  {
    id:86, name:"Diwali Chakli", hindi:"चकली", emoji:"🌀",
    cuisine:"Marathi", diet:"veg", level:"boss", section:"special-diwali",
    time:"60 mins", badge:"Diwali Diva 🌀", tags:["diwali","festival"],
    desc:"Crispy spiralled chakli — the iconic Diwali snack of Maharashtra!",
    ingredients:["2 cups rice flour","½ cup urad dal flour (or add 2 tbsp sesame seeds)","1 tsp cumin seeds","1 tsp sesame seeds","½ tsp red chilli powder","½ tsp turmeric","2 tbsp butter or oil","Salt to taste","Warm water as needed","Oil for deep frying","Chakli maker or murukku press"],
    steps:[
      {safety:false, text:"Wash hands. In a large bowl, combine rice flour, urad dal flour, cumin seeds, sesame seeds, red chilli powder, turmeric, butter, and salt. Mix well.",
},
      {safety:false, text:"Add warm water gradually and knead into a smooth, firm dough — it should be stiffer than chapati dough.",
},
      {safety:false, text:"Load the dough into the chakli maker with the star-shaped plate. Press out a test spiral on a piece of foil or parchment to practice.",
},
      {safety:false, text:"Press out chaklis directly onto oiled foil or parchment, making 8 to 10 cm spirals with 2 to 3 rings each.",
},
      {safety:true, text:"GROWN-UP — Heat oil in a deep pan for deep frying to 170°C (340°F). Test with a small piece of dough — it should sizzle and float immediately.",
},
      {safety:true, text:"GROWN-UP — Gently slide 3 to 4 chaklis into the hot oil. Fry for 3 to 4 minutes, turning carefully, until golden and completely crispy.",
},
      {safety:true, text:"GROWN-UP — Remove with a slotted spoon and drain on paper towels. Let them cool completely.",
},
      {safety:false, text:"Once completely cool and crispy, arrange on a plate. Store in an airtight tin for up to 2 weeks!",
},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ⭐  NO-COOK / NO-FLAME  ·  VEG  ·  AGE 7-12
  //     🇮🇳 Indian Snacks & Quick Bites
  // ══════════════════════════════════════════════════════════════

  {
    id:87, name:"Cheese Corn Sandwich", hindi:"चीज़ कॉर्न सैंडविच", emoji:"🧀",
    cuisine:"Indian Fusion", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Sandwich Star 🌟", tags:["snack","indian","no-cook"],
    desc:"Buttered bread layered with sweet corn and melted cheese — Mumbai tiffin favourite!",
    ingredients:["4 slices white bread","½ cup sweet corn (boiled or canned)","4 tbsp grated cheese","2 tbsp green chutney","2 tbsp butter (softened)","Salt and pepper to taste"],
    steps:[
      {safety:false, text:"Wash your hands with soap for 20 seconds. Lay all 4 bread slices flat on a clean surface."},
      {safety:false, text:"Spread softened butter evenly on one side of each bread slice — all the way to the edges."},
      {safety:false, text:"Spread green chutney over the butter on 2 of the slices. This is your flavour base!"},
      {safety:false, text:"Drain the sweet corn well and pat dry with a paper towel. Scatter corn evenly over the chutney."},
      {safety:false, text:"Sprinkle grated cheese generously over the corn. Add a pinch of salt and pepper."},
      {safety:false, text:"Press the other 2 bread slices (butter side down) firmly on top to make 2 sandwiches."},
      {safety:false, text:"Press each sandwich gently with your palm to stick everything together. Cut diagonally into triangles."},
      {safety:false, text:"Serve immediately with extra chutney on the side. Yum!"},
    ],
  },

  {
    id:88, name:"Mint Chutney Sandwich", hindi:"हरी चटनी सैंडविच", emoji:"🌿",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"6 mins", badge:"Green Machine 💚", tags:["snack","indian","no-cook"],
    desc:"Fresh mint chutney slathered thick between soft bread with cool cucumber rounds!",
    ingredients:["4 slices soft white or brown bread","4 tbsp ready-made mint chutney","1 small cucumber, sliced into thin rounds","4 tbsp grated carrot","2 tbsp butter"],
    steps:[
      {safety:false, text:"Wash hands. Lay bread slices on a clean chopping board."},
      {safety:false, text:"Spread butter lightly on one side of all 4 slices."},
      {safety:false, text:"Spread a generous layer of mint chutney on the butter — be bold with it!"},
      {safety:false, text:"Layer cucumber rounds on 2 slices, covering the whole surface."},
      {safety:false, text:"Sprinkle grated carrot over the cucumber for colour and crunch."},
      {safety:false, text:"Press the remaining 2 slices on top (chutney side facing in). Push down gently."},
      {safety:false, text:"Cut into triangles or rectangles. The green chutney peeking out looks amazing!"},
    ],
  },

  {
    id:89, name:"Jam Coconut Sandwich", hindi:"जैम नारियल सैंडविच", emoji:"🍓",
    cuisine:"Indian", diet:"veg", level:"starter", section:"kids",
    time:"5 mins", badge:"Tiffin Hero 🎒", tags:["snack","sweet","no-cook"],
    desc:"Strawberry jam plus desiccated coconut on buttered bread — the classic Indian tiffin!",
    ingredients:["4 slices white bread","4 tbsp strawberry or mixed fruit jam","4 tbsp desiccated coconut","2 tbsp butter"],
    steps:[
      {safety:false, text:"Wash hands. Place all bread slices on a clean plate."},
      {safety:false, text:"Spread softened butter on one side of each slice."},
      {safety:false, text:"Spread a thick layer of jam on 2 of the slices — all the way to the crust edges."},
      {safety:false, text:"Sprinkle 2 tablespoons of desiccated coconut evenly over the jam on each slice."},
      {safety:false, text:"Press the remaining 2 slices on top (butter side down). Squeeze gently so the coconut sticks."},
      {safety:false, text:"Cut in half and serve. The coconut gives the most satisfying crunch!"},
    ],
  },

  {
    id:90, name:"Paneer Stuffed Bread Rolls", hindi:"पनीर ब्रेड रोल", emoji:"🧀",
    cuisine:"North Indian", diet:"veg", level:"starter", section:"kids",
    time:"12 mins", badge:"Roll Master 🌀", tags:["snack","indian","no-cook"],
    desc:"Mashed spiced paneer rolled inside soft bread — press and eat, no frying needed!",
    ingredients:["6 slices white bread","100g paneer (grated)","1 small green chilli (optional — skip for younger kids)","¼ tsp cumin powder","¼ tsp chaat masala","Salt to taste","2 tbsp coriander leaves, chopped","Water for pressing"],
    steps:[
      {safety:false, text:"Wash hands. In a bowl, mix grated paneer with cumin powder, chaat masala, salt, and chopped coriander."},
      {safety:false, text:"Taste the paneer mix — add more chaat masala if you like it tangier!"},
      {safety:false, text:"Remove crusts from the bread slices and flatten each slice with a rolling pin or smooth cup."},
      {safety:false, text:"Wet your fingers lightly with water and dab the edges of one bread slice."},
      {safety:false, text:"Place a tablespoon of paneer filling in the centre of the flat bread slice."},
      {safety:false, text:"Roll the bread tightly around the filling. Press the wet edge firmly to seal the roll."},
      {safety:false, text:"Repeat for all slices. Arrange on a plate — seam side down so they don't open."},
      {safety:false, text:"Serve immediately with mint chutney and tomato ketchup!"},
    ],
  },

  {
    id:91, name:"Roti Wrap with Veggies", hindi:"रोटी रैप", emoji:"🌯",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Wrap King 🎖️", tags:["lunch","indian","no-cook"],
    desc:"Leftover roti transformed into a colourful veggie wrap — zero waste, maximum taste!",
    ingredients:["2 leftover rotis or chapatis","4 tbsp coriander mint chutney","½ cup shredded cabbage","1 small carrot, grated","2 tbsp grated cheese","½ cucumber, cut into thin sticks","Salt and chaat masala to taste"],
    steps:[
      {safety:false, text:"Wash hands. Place a roti flat on a clean plate or board."},
      {safety:false, text:"Spread 2 tablespoons of chutney all over the roti surface — right to the edges."},
      {safety:false, text:"Lay shredded cabbage in a line across the centre of the roti."},
      {safety:false, text:"Add grated carrot, cucumber sticks, and grated cheese on top of the cabbage."},
      {safety:false, text:"Sprinkle a pinch of salt and chaat masala over all the fillings."},
      {safety:false, text:"Roll the roti tightly from one side, tucking the fillings in as you go."},
      {safety:false, text:"Cut in half diagonally. The colourful filling cross-section is the best part!"},
    ],
  },

  // ── Indian Chaat & Street Food ──────────────────────────────

  {
    id:92, name:"Sev Puri", hindi:"सेव पूरी", emoji:"🌶️",
    cuisine:"Mumbai Street Food", diet:"veg", level:"starter", section:"kids",
    time:"10 mins", badge:"Chaat Champion 🏆", tags:["chaat","indian","fun","no-cook"],
    desc:"The most fun food you'll ever assemble — crispy puris piled with toppings and two chutneys!",
    ingredients:["20 ready-made flat puris","1 medium potato (boiled and mashed)","½ cup fine sev","3 tbsp tamarind chutney","3 tbsp green mint chutney","2 tbsp finely chopped onion","2 tbsp pomegranate seeds","Chaat masala and salt to taste","Fresh coriander to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Arrange all your toppings in small bowls like a production line — this is the fun part!"},
      {safety:false, text:"Mix mashed potato with a pinch of salt and chaat masala in a small bowl."},
      {safety:false, text:"Lay 5 puris flat on a plate. Make a tiny hole in the centre of each puri with your thumb."},
      {safety:false, text:"Place a small teaspoon of spiced mashed potato on each puri."},
      {safety:false, text:"Add a tiny pinch of chopped onion on top of the potato."},
      {safety:false, text:"Drizzle ½ teaspoon of tamarind chutney, then ½ teaspoon of green chutney over each puri."},
      {safety:false, text:"Pile a generous pinch of sev on top — the more the better!"},
      {safety:false, text:"Add 2-3 pomegranate seeds and a few coriander leaves on top. Serve immediately — eat in one bite!"},
    ],
  },

  {
    id:93, name:"Papdi Chaat", hindi:"पापड़ी चाट", emoji:"✨",
    cuisine:"North Indian", diet:"veg", level:"starter", section:"kids",
    time:"12 mins", badge:"Street Food Star ⭐", tags:["chaat","indian","fun","no-cook"],
    desc:"Crispy papdi stacked with potatoes, chickpeas, dahi and two chutneys — India's greatest snack!",
    ingredients:["20 ready-made papdis","1 cup boiled chickpeas (canned is fine)","1 medium boiled potato, diced small","1 cup thick whisked dahi (yogurt)","3 tbsp tamarind chutney","3 tbsp green chutney","½ cup sev","1 tsp chaat masala","¼ tsp roasted cumin powder","Salt to taste","Coriander leaves to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Whisk the dahi with a fork until it's completely smooth and creamy. Add a pinch of salt."},
      {safety:false, text:"Arrange papdi in a single layer on a wide plate or tray."},
      {safety:false, text:"Place a few pieces of diced potato and chickpeas on each papdi."},
      {safety:false, text:"Spoon a generous tablespoon of dahi over each papdi, covering the potato and chickpeas."},
      {safety:false, text:"Drizzle tamarind chutney over one half and green chutney over the other half."},
      {safety:false, text:"Sprinkle chaat masala and roasted cumin powder evenly over everything."},
      {safety:false, text:"Pile sev generously on top — it should cover everything like a delicious mountain!"},
      {safety:false, text:"Garnish with fresh coriander. Serve immediately before the papdi gets soggy!"},
    ],
  },

  {
    id:94, name:"Rajma Chaat", hindi:"राजमा चाट", emoji:"🫘",
    cuisine:"North Indian", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Protein Power 💪", tags:["chaat","indian","healthy","no-cook"],
    desc:"Boiled rajma tossed with onion, tomato and chaat masala — a power-packed no-cook snack!",
    ingredients:["1 cup boiled or canned rajma (kidney beans), drained","1 small onion, finely chopped","1 small tomato, finely chopped","2 tbsp fresh coriander, chopped","1 tsp chaat masala","½ tsp roasted cumin powder","1 tbsp lemon juice","Salt and black pepper to taste","Green chilli (optional)"],
    steps:[
      {safety:false, text:"Wash hands. Drain canned rajma and rinse well under cold water in a strainer."},
      {safety:false, text:"Place rajma in a mixing bowl. Pat dry with a paper towel to remove excess water."},
      {safety:false, text:"Add finely chopped onion and tomato to the bowl."},
      {safety:false, text:"Add chaat masala, cumin powder, salt, and black pepper. Mix gently."},
      {safety:false, text:"Squeeze lemon juice over everything and toss to combine."},
      {safety:false, text:"Taste — does it need more lemon? More chaat masala? Adjust until it's perfect for you!"},
      {safety:false, text:"Garnish with fresh coriander. Serve in small cups or bowls."},
    ],
  },

  {
    id:95, name:"Moong Dal Chaat", hindi:"मूंग दाल चाट", emoji:"🌱",
    cuisine:"North Indian", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Sprout Scout 🌱", tags:["chaat","indian","healthy","no-cook"],
    desc:"Soaked moong dal tossed with fresh vegetables — alive, crunchy and full of goodness!",
    ingredients:["1 cup whole moong dal (soaked overnight or 8 hours in water)","1 small onion, chopped fine","1 small tomato, chopped fine","½ cucumber, chopped","2 tbsp coriander leaves","1 tsp chaat masala","1 tbsp lemon juice","Salt to taste"],
    steps:[
      {safety:false, text:"Wash hands. Drain the soaked moong dal in a strainer and rinse under cold water."},
      {safety:false, text:"Taste one dal — it should be soft but still have a slight bite. Perfect!"},
      {safety:false, text:"Put drained moong dal in a bowl. Add chopped onion, tomato, and cucumber."},
      {safety:false, text:"Add chaat masala, salt, and squeeze in the lemon juice."},
      {safety:false, text:"Mix gently with a spoon — don't mash the dal, just coat it in the spices."},
      {safety:false, text:"Taste and adjust — more lemon makes it brighter, more chaat masala makes it tangier."},
      {safety:false, text:"Garnish with fresh coriander and serve right away!"},
    ],
  },

  {
    id:96, name:"Boondi Raita", hindi:"बूंदी रायता", emoji:"🥣",
    cuisine:"North Indian", diet:"veg", level:"starter", section:"kids",
    time:"6 mins", badge:"Cooling Champ ❄️", tags:["side","indian","no-cook"],
    desc:"Crispy boondi floating in creamy spiced dahi — the perfect cooling partner for any meal!",
    ingredients:["1 cup thick fresh dahi (yogurt)","½ cup ready-made boondi (plain or masala)","½ tsp roasted cumin powder","¼ tsp chaat masala","Salt to taste","Fresh mint leaves to garnish","Optional: pinch of red chilli powder"],
    steps:[
      {safety:false, text:"Wash hands. Pour the dahi into a mixing bowl and whisk with a fork until silky smooth."},
      {safety:false, text:"Add roasted cumin powder, chaat masala, and salt. Whisk again to combine."},
      {safety:false, text:"Soak the boondi in a bowl of water for 2 minutes to soften slightly, then squeeze out the water."},
      {safety:false, text:"Fold the soft boondi gently into the spiced dahi. Don't overmix — you want them to hold their shape."},
      {safety:false, text:"Taste — is it tangy enough? Add more cumin or chaat masala if needed."},
      {safety:false, text:"Garnish with mint leaves and a tiny pinch of red chilli powder on top. Serve chilled!"},
    ],
  },

  {
    id:97, name:"Veg Raita Bowl", hindi:"सब्ज़ी रायता", emoji:"🥗",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Rainbow Bowl 🌈", tags:["healthy","indian","no-cook"],
    desc:"Grated cucumber, carrot and beetroot folded into cool dahi — a rainbow in a bowl!",
    ingredients:["1 cup thick dahi","½ cucumber, grated","1 small carrot, grated","2 tbsp grated beetroot","½ tsp roasted cumin powder","Salt to taste","Fresh mint or coriander to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Grate the cucumber, carrot, and beetroot using the medium-sized grater holes."},
      {safety:false, text:"Squeeze excess water from the grated cucumber and beetroot using your hands over the sink."},
      {safety:false, text:"Whisk the dahi in a bowl until smooth. Add salt and roasted cumin powder."},
      {safety:false, text:"Fold in the grated vegetables gently — the beetroot will turn the raita a beautiful pink!"},
      {safety:false, text:"Taste and add more salt or cumin if needed."},
      {safety:false, text:"Garnish with mint or coriander. Serve cold alongside any Indian meal!"},
    ],
  },

  {
    id:98, name:"Cucumber Peanut Salad", hindi:"खीरा मूंगफली सलाद", emoji:"🥒",
    cuisine:"South Indian", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Kosambari King 👑", tags:["salad","south","healthy","no-cook"],
    desc:"Kosambari — the South Indian salad of cucumber, soaked moong, coconut and lemon that's utterly refreshing!",
    ingredients:["2 cucumbers, diced small","¼ cup soaked moong dal (soaked 2 hours)","3 tbsp roasted peanuts (crushed)","2 tbsp fresh grated coconut","1 tbsp lemon juice","½ tsp mustard seeds (optional — skip if no heat)","1 green chilli, very finely chopped (optional)","Salt to taste","Coriander leaves to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Drain soaked moong dal in a strainer. Rinse under cold water and set aside."},
      {safety:false, text:"Dice cucumbers into small pieces — about the size of a chickpea. Place in a mixing bowl."},
      {safety:false, text:"Add the drained moong dal, crushed peanuts, and grated coconut to the cucumber."},
      {safety:false, text:"Squeeze lemon juice over everything. Add salt and the green chilli if using."},
      {safety:false, text:"Mix gently to combine all the textures — crunchy peanuts, soft dal, juicy cucumber."},
      {safety:false, text:"Taste! The peanuts should crunch, the dal should be tender, the whole thing bright and lemony."},
      {safety:false, text:"Garnish with fresh coriander and serve immediately — best eaten fresh!"},
    ],
  },

  {
    id:99, name:"Carrot Beetroot Salad", hindi:"गाजर चुकंदर सलाद", emoji:"🥕",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Colour Chef 🎨", tags:["salad","healthy","indian","no-cook"],
    desc:"Vibrant grated carrot and beetroot with lemon and spices — like edible art on a plate!",
    ingredients:["2 medium carrots, grated","1 medium beetroot, grated","1 tbsp lemon juice","½ tsp chaat masala","Salt to taste","2 tbsp roasted peanuts","Fresh coriander to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Wash carrots and beetroot thoroughly. Grate both using the medium grater."},
      {safety:false, text:"Warning: beetroot WILL stain your hands and clothes! Keep paper towels nearby."},
      {safety:false, text:"Mix grated carrot and beetroot together in a bowl — look at that incredible colour!"},
      {safety:false, text:"Add lemon juice, chaat masala, and salt. Toss well to combine."},
      {safety:false, text:"Taste — beetroot is earthy, carrot is sweet, lemon is bright. Adjust to your liking."},
      {safety:false, text:"Scatter roasted peanuts on top for crunch. Garnish with coriander and serve!"},
    ],
  },

  // ── Indian Comfort Bowls ────────────────────────────────────

  {
    id:100, name:"Lemon Rice Bowl", hindi:"नींबू चावल", emoji:"🍋",
    cuisine:"South Indian", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Lemon Royalty 🍋", tags:["rice","south","no-cook"],
    desc:"Pre-cooked rice transformed with lemon, peanuts and turmeric — South India's sunshine in a bowl!",
    ingredients:["2 cups pre-cooked rice (cooled)","3 tbsp lemon juice","¼ tsp turmeric powder","3 tbsp roasted peanuts","1 tsp sesame seeds (optional)","Salt to taste","Fresh coriander to garnish"],
    steps:[
      {safety:false, text:"Wash hands. Spread cooled pre-cooked rice in a wide mixing bowl. Separate any clumps with your fingers."},
      {safety:false, text:"Sprinkle turmeric powder over the rice and toss gently — it turns the rice a beautiful golden yellow."},
      {safety:false, text:"Pour lemon juice over the rice and mix well. Add salt and taste — it should be tangy and bright!"},
      {safety:false, text:"Add the roasted peanuts — these give the most satisfying crunch to every bite."},
      {safety:false, text:"Add sesame seeds if using and toss everything together gently."},
      {safety:false, text:"Taste once more and adjust lemon or salt. Garnish with coriander and serve at room temperature!"},
    ],
  },

  {
    id:101, name:"Curd Poha", hindi:"दही पोहा", emoji:"🥣",
    cuisine:"Gujarati", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Morning Magic ☀️", tags:["breakfast","indian","no-cook"],
    desc:"Soaked poha folded with sweet dahi, sugar and pomegranate — Gujarat's magical breakfast!",
    ingredients:["1 cup thin poha (beaten rice)","½ cup thick dahi","2 tsp sugar","¼ tsp salt","2 tbsp pomegranate seeds","Fresh grated coconut to garnish (optional)"],
    steps:[
      {safety:false, text:"Wash hands. Place poha in a strainer and rinse under cold water for 30 seconds. Shake off excess water."},
      {safety:false, text:"Let the poha sit in the strainer for 5 minutes — it will soften gently on its own."},
      {safety:false, text:"Transfer softened poha to a bowl. Check texture — it should be soft but not mushy."},
      {safety:false, text:"Add thick dahi, sugar, and salt to the poha. Fold gently — don't stir aggressively."},
      {safety:false, text:"Taste! It should be slightly sweet, slightly salty, very creamy. Adjust to taste."},
      {safety:false, text:"Top with pomegranate seeds and coconut. Serve immediately — this doesn't wait!"},
    ],
  },

  {
    id:102, name:"Masala Curd Rice Bowl", hindi:"मसाला दही चावल", emoji:"🍚",
    cuisine:"South Indian", diet:"veg", level:"starter", section:"kids",
    time:"8 mins", badge:"Comfort King 🤗", tags:["rice","south","comfort","no-cook"],
    desc:"Pre-cooked rice mashed with curd and topped with fresh crunchy veggies — South India's hug food!",
    ingredients:["2 cups pre-cooked rice","1 cup thick dahi","½ cucumber, grated","1 small carrot, grated","Salt to taste","½ tsp roasted cumin powder","Curry leaves (optional)","Green chilli (optional)"],
    steps:[
      {safety:false, text:"Wash hands. Place pre-cooked rice in a bowl and mash very lightly with a fork."},
      {safety:false, text:"Pour dahi over the rice. Mix together — it should have a creamy porridge-like consistency."},
      {safety:false, text:"If it's too thick, add a little cold milk or water to loosen it slightly."},
      {safety:false, text:"Add salt and roasted cumin powder. Mix well."},
      {safety:false, text:"Top with grated cucumber and carrot for freshness and crunch."},
      {safety:false, text:"Taste — curd rice should be cooling, mildly salty, and creamy. Adjust seasoning and serve!"},
    ],
  },

  {
    id:103, name:"Sweet Banana Poha", hindi:"केला पोहा", emoji:"🍌",
    cuisine:"Kerala", diet:"veg", level:"starter", section:"kids",
    time:"6 mins", badge:"Kerala Star ⭐", tags:["breakfast","sweet","kerala","no-cook"],
    desc:"Soaked poha with ripe banana, honey and cardamom — Kerala's most comforting breakfast!",
    ingredients:["1 cup thin poha","1 ripe banana, sliced","2 tsp honey","¼ tsp cardamom powder","2 tbsp desiccated coconut or fresh coconut","Pinch of salt"],
    steps:[
      {safety:false, text:"Wash hands. Rinse poha in a strainer under cold water for 20 seconds. Shake off excess. Set aside to soften."},
      {safety:false, text:"Slice the banana into thin rounds and place in a serving bowl."},
      {safety:false, text:"Once poha has softened (about 3 minutes), add it to the banana."},
      {safety:false, text:"Drizzle honey over everything. Add cardamom powder and a tiny pinch of salt."},
      {safety:false, text:"Sprinkle coconut on top. Fold everything together very gently — the banana should stay whole."},
      {safety:false, text:"Eat immediately! This is breakfast perfection — sweet, soft and aromatic."},
    ],
  },

  // ── Indian Sweets & Treats ──────────────────────────────────

  {
    id:104, name:"Biscuit Cake", hindi:"बिस्किट केक", emoji:"🎂",
    cuisine:"Indian Fusion", diet:"veg", level:"starter", section:"kids",
    time:"20 mins + chill", badge:"No-Bake Baker 🎂", tags:["sweet","no-bake","no-cook"],
    desc:"Marie biscuits layered with chocolate cream — a no-oven, no-bake cake that looks incredible!",
    ingredients:["20 Marie biscuits","1 cup milk","3 tbsp cocoa powder","4 tbsp sugar","2 tbsp butter","½ tsp vanilla essence","Optional: sprinkles, crushed biscuits to decorate"],
    steps:[
      {safety:false, text:"Wash hands. Mix cocoa powder, sugar, and vanilla essence in a bowl. Set aside."},
      {safety:false, text:"Pour milk into the cocoa mixture and stir until smooth — this is your dipping liquid."},
      {safety:false, text:"Melt butter (ask a grown-up for the microwave — 20 seconds). Stir into the mixture."},
      {safety:false, text:"Dip each Marie biscuit briefly into the mixture (1 second only — don't let it get soggy!)."},
      {safety:false, text:"Layer dipped biscuits in a container, then spread remaining chocolate cream over each layer."},
      {safety:false, text:"Continue layering until all biscuits and cream are used. Finish with a cream layer on top."},
      {safety:false, text:"Decorate with sprinkles or crushed biscuits. Refrigerate for at least 2 hours before serving!"},
    ],
  },

  {
    id:105, name:"Marie Biscuit Chocolate Rolls", hindi:"मैरी बिस्किट चॉकलेट रोल", emoji:"🍫",
    cuisine:"Indian Fusion", diet:"veg", level:"starter", section:"kids",
    time:"15 mins", badge:"Truffle Maker 🍫", tags:["sweet","fun","no-cook"],
    desc:"Crushed Marie biscuits rolled with cocoa and condensed milk into perfect little truffles!",
    ingredients:["15 Marie biscuits","3 tbsp cocoa powder","4 tbsp condensed milk","2 tbsp butter (softened)","Desiccated coconut or sprinkles for rolling"],
    steps:[
      {safety:false, text:"Wash hands. Place Marie biscuits in a ziplock bag and crush with a rolling pin until fine crumbs."},
      {safety:false, text:"Pour biscuit crumbs into a bowl. Add cocoa powder and mix until combined."},
      {safety:false, text:"Add softened butter and condensed milk. Mix together with your hands until it forms a dough."},
      {safety:false, text:"The dough should hold its shape when you squeeze it. If too dry, add a little more condensed milk."},
      {safety:false, text:"Take a tablespoon of dough and roll between your palms into a smooth ball."},
      {safety:false, text:"Roll each ball in desiccated coconut or sprinkles to coat completely."},
      {safety:false, text:"Place on a plate and refrigerate for 30 minutes to firm up. They're perfect fridge treats!"},
    ],
  },

  {
    id:106, name:"Dry Fruit Ladoo", hindi:"ड्राई फ्रूट लड्डू", emoji:"🌰",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"15 mins", badge:"Energy Ball Legend ⚡", tags:["sweet","healthy","no-cook"],
    desc:"Dates blended with nuts — three ingredients, pure natural energy, rolled into golden balls!",
    ingredients:["1 cup Medjool dates (or regular dates, pitted)","½ cup mixed nuts (almonds, cashews, walnuts)","2 tbsp desiccated coconut","¼ tsp cardamom powder","Pinch of salt"],
    steps:[
      {safety:false, text:"Wash hands. Remove pits from all dates if they have them — check every single one!"},
      {safety:false, text:"Place dates in a food processor or blender. Blend until they form a sticky paste."},
      {safety:false, text:"Add mixed nuts and pulse a few times — you want chunky nut pieces, not powder."},
      {safety:false, text:"Add cardamom powder and a pinch of salt. Pulse once more to combine."},
      {safety:false, text:"Transfer the mixture to a bowl. It should be sticky and hold its shape when pressed."},
      {safety:false, text:"Take a tablespoon of mixture and roll firmly between your palms into a smooth ball."},
      {safety:false, text:"Roll each ball in desiccated coconut to coat. These keep in the fridge for 2 weeks!"},
    ],
  },

  {
    id:107, name:"Mango Shrikhand", hindi:"आम श्रीखंड", emoji:"🥭",
    cuisine:"Gujarati / Maharashtrian", diet:"veg", level:"starter", section:"kids",
    time:"10 mins", badge:"Shrikhand Superstar 🌟", tags:["sweet","gujarati","no-cook"],
    desc:"Hung curd whipped with mango pulp, cardamom and saffron — Maharashtra's greatest dessert!",
    ingredients:["2 cups thick hung curd (yogurt drained overnight in a muslin cloth)","½ cup mango pulp (fresh or canned Alphonso)","3 tbsp sugar","¼ tsp cardamom powder","Pinch of saffron soaked in 1 tsp warm milk","Pistachios to garnish"],
    steps:[
      {safety:false, text:"Wash hands. If you haven't already hung the curd, do it now — it needs 4-6 hours in a muslin cloth in the fridge."},
      {safety:false, text:"Place the thick hung curd in a mixing bowl. Whisk with a fork until completely lump-free and creamy."},
      {safety:false, text:"Add sugar and whisk again until the sugar dissolves and the mixture is silky."},
      {safety:false, text:"Add mango pulp, cardamom powder, and saffron-soaked milk. Fold together gently."},
      {safety:false, text:"Taste — it should be sweet, fragrant with cardamom, and intensely mango. Adjust sugar if needed."},
      {safety:false, text:"Pour into small serving cups or bowls. Garnish with sliced pistachios."},
      {safety:false, text:"Refrigerate for 1 hour before serving — shrikhand is always served cold!"},
    ],
  },

  {
    id:108, name:"Rose Milk Dessert Cup", hindi:"रोज़ मिल्क कप", emoji:"🌹",
    cuisine:"Tamil Nadu / Karnataka", diet:"veg", level:"starter", section:"kids",
    time:"6 mins", badge:"Pink Dream 🌸", tags:["sweet","drink","south","no-cook"],
    desc:"Cold milk with rose syrup and basil seeds — the beautiful pink drink from Tamil Nadu!",
    ingredients:["2 cups cold full-fat milk","4 tbsp rose syrup (Rooh Afza or similar)","2 tsp sabja seeds (basil seeds) soaked in ½ cup water for 15 mins","4 ice cubes","Optional: 1 tbsp condensed milk for extra creaminess"],
    steps:[
      {safety:false, text:"Wash hands. Soak sabja seeds in ½ cup water for 15 minutes — they'll swell into beautiful little pearls!"},
      {safety:false, text:"Pour cold milk into 2 tall glasses (about 1 cup each)."},
      {safety:false, text:"Add 2 tablespoons of rose syrup to each glass and stir gently."},
      {safety:false, text:"Watch the pink swirl bloom through the white milk — it's like magic!"},
      {safety:false, text:"Drain the swollen sabja seeds through a strainer and spoon them into each glass."},
      {safety:false, text:"Add 2 ice cubes to each glass. Stir gently and serve immediately — it should be a gorgeous pink!"},
    ],
  },

  // ── Indian Drinks ────────────────────────────────────────────

  {
    id:109, name:"Nimbu Pani", hindi:"नींबू पानी", emoji:"🍋",
    cuisine:"Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"5 mins", badge:"Lemonade Legend 🍋", tags:["drink","summer","no-cook"],
    desc:"India's original lemonade — fresh lime with black salt and cumin that's leagues beyond anything bottled!",
    ingredients:["3 fresh limes or lemons","3 tsp sugar (or to taste)","¼ tsp black salt","¼ tsp roasted cumin powder","2 cups cold water","4 ice cubes","Fresh mint leaves"],
    steps:[
      {safety:false, text:"Wash hands. Roll each lime firmly on the counter with your palm — this releases more juice!"},
      {safety:false, text:"Cut limes in half and squeeze all the juice into a jug using a citrus squeezer. Remove any seeds."},
      {safety:false, text:"Add sugar to the lime juice and stir vigorously until it completely dissolves."},
      {safety:false, text:"Add black salt and roasted cumin powder. These are what make this INDIAN lemonade — never skip them!"},
      {safety:false, text:"Pour in cold water and stir well. Taste — add more sugar, salt or lime until perfectly balanced."},
      {safety:false, text:"Fill two tall glasses with ice cubes. Pour the nimbu pani over the ice."},
      {safety:false, text:"Garnish with fresh mint leaves. Serve immediately — this is summer in a glass!"},
    ],
  },

  {
    id:110, name:"Masala Chaas", hindi:"मसाला छाछ", emoji:"🥛",
    cuisine:"Gujarat / Rajasthan", diet:"veg", level:"starter", section:"kids",
    time:"5 mins", badge:"Digestive Genius 🧠", tags:["drink","cooling","no-cook"],
    desc:"Spiced buttermilk with cumin and coriander — the ultimate cooling drink of India!",
    ingredients:["1 cup thick dahi (yogurt)","1 cup cold water","½ tsp roasted cumin powder","¼ tsp black salt","Salt to taste","1 tbsp fresh coriander, chopped","Optional: pinch of ginger powder","Ice cubes to serve"],
    steps:[
      {safety:false, text:"Wash hands. Pour dahi into a blender or large jar with a whisk."},
      {safety:false, text:"Add cold water and blend or whisk vigorously until completely frothy — about 30 seconds."},
      {safety:false, text:"Add roasted cumin powder, black salt, and regular salt. Blend 5 more seconds."},
      {safety:false, text:"Taste! It should be cool, tangy, lightly spiced. Add more cumin or salt if needed."},
      {safety:false, text:"Pour into glasses over ice. Float chopped coriander on top."},
      {safety:false, text:"Serve very cold — chaas on a hot day is pure bliss!"},
    ],
  },

  {
    id:111, name:"Rooh Afza Milk Drink", hindi:"रूह अफ़ज़ा मिल्क", emoji:"🌹",
    cuisine:"Mughlai / Pan-India", diet:"veg", level:"starter", section:"kids",
    time:"3 mins", badge:"Pink Royalty 👑", tags:["drink","sweet","summer","no-cook"],
    desc:"The iconic red bottle meets cold milk — three ingredients, one legendary summer drink!",
    ingredients:["2 cups cold full-fat milk","4 tbsp Rooh Afza syrup","2 tsp sabja seeds (soaked, optional)","4 ice cubes"],
    steps:[
      {safety:false, text:"Wash hands. Pour 1 cup of cold milk into each tall glass."},
      {safety:false, text:"Add 2 tablespoons of Rooh Afza to each glass."},
      {safety:false, text:"Stir with a long spoon — watch the red syrup turn the milk a gorgeous deep pink!"},
      {safety:false, text:"Add soaked sabja seeds if using — they add a lovely texture."},
      {safety:false, text:"Drop 2 ice cubes into each glass. Taste and add more Rooh Afza if you want it sweeter."},
      {safety:false, text:"Serve immediately — this is the drink of Ramadan, summer evenings and every childhood memory!"},
    ],
  },

  // ── Build-Your-Own ────────────────────────────────────────────

  {
    id:112, name:"Make Your Own Sandwich Bar", hindi:"सैंडविच बार", emoji:"🥪",
    cuisine:"Global", diet:"veg", level:"starter", section:"kids",
    time:"15 mins", badge:"Sandwich Bar Boss 🥪", tags:["build","fun","no-cook"],
    desc:"Set out 8 fillings, 4 breads and 5 spreads — every kid builds their own masterpiece!",
    ingredients:["4 types of bread (white, brown, pita, bun)","Butter and cream cheese","Green chutney and hummus","Cheese slices and grated cheese","Cucumber, tomato, onion rings","Lettuce, bell peppers","Grated carrot, corn kernels","Your favourite sauce or dressing"],
    steps:[
      {safety:false, text:"Wash hands. Set out all your ingredients in small bowls arranged in a line — your sandwich bar is open!"},
      {safety:false, text:"Choose your bread first — will you go white, brown, pita or bun today?"},
      {safety:false, text:"Spread your base — butter, cream cheese, chutney or hummus — generously on both slices."},
      {safety:false, text:"Layer your protein first (cheese, boiled egg if you have it) directly on the spread."},
      {safety:false, text:"Add your veggies — stack them HIGH for a colourful, crunchy sandwich!"},
      {safety:false, text:"Drizzle your sauce. Press the top bread firmly down."},
      {safety:false, text:"Cut it diagonally to reveal the colourful cross-section. Your unique creation is ready!"},
    ],
  },

  {
    id:113, name:"DIY Chaat Plate", hindi:"चाट प्लेट", emoji:"🌶️",
    cuisine:"Indian Street Food", diet:"veg", level:"starter", section:"kids",
    time:"12 mins", badge:"Chaat Artist 🎨", tags:["build","chaat","indian","fun","no-cook"],
    desc:"Set out every chaat ingredient and let each kid build their own totally unique plate!",
    ingredients:["Papdi or puris (ready-made)","Boiled potatoes (diced)","Boiled chickpeas (canned is fine)","Thick whisked dahi","Tamarind chutney","Green mint chutney","Fine sev","Pomegranate seeds","Chaat masala and cumin powder","Fresh coriander"],
    steps:[
      {safety:false, text:"Wash hands. Set out all chaat components in separate small bowls on the table — this is your chaat station!"},
      {safety:false, text:"Place 5 papdi or puris on your plate in a single layer."},
      {safety:false, text:"Spoon potato and chickpeas over the papdi as your base layer."},
      {safety:false, text:"Drizzle dahi generously over everything — be bold!"},
      {safety:false, text:"Now drizzle BOTH chutneys — tamarind for sweet-sour, green for spicy-fresh."},
      {safety:false, text:"Shower sev over the top — the more the better!"},
      {safety:false, text:"Sprinkle chaat masala, cumin, pomegranate seeds, and coriander. EAT IMMEDIATELY before it goes soggy!"},
    ],
  },

  {
    id:114, name:"Make Your Own Smoothie Bowl", hindi:"स्मूदी बाउल", emoji:"🍓",
    cuisine:"Global", diet:"veg", level:"starter", section:"kids",
    time:"10 mins", badge:"Smoothie Artist 🎨", tags:["build","healthy","breakfast","no-cook"],
    desc:"Thick blended fruit base topped with 10 toppings of your choice — edible art you can eat!",
    ingredients:["2 frozen bananas","½ cup frozen berries or mango","4 tbsp yogurt","Toppings: granola, sliced fresh fruit, coconut flakes, honey, chia seeds, nut butter, chocolate chips, seeds"],
    steps:[
      {safety:false, text:"Wash hands. Set out all your toppings in small bowls first — design your bowl before you blend!"},
      {safety:false, text:"Place frozen bananas and frozen berries into the blender with the yogurt."},
      {safety:false, text:"Blend until thick and creamy — it should be thicker than a smoothie you drink! If too thin, add more frozen fruit."},
      {safety:false, text:"Pour the thick smoothie base into a wide bowl."},
      {safety:false, text:"Now decorate! Start from the outside edge and work inward. Place toppings in neat rows or patterns."},
      {safety:false, text:"Take a photo first — this is genuinely too beautiful to eat immediately. Then eat it before it melts!"},
    ],
  },

  {
    id:115, name:"Taco Assembly Station", hindi:"टैको स्टेशन", emoji:"🌮",
    cuisine:"Mexican", diet:"veg", level:"starter", section:"kids",
    time:"12 mins", badge:"Taco Boss 🌮", tags:["build","global","fun","no-cook"],
    desc:"Lay out every filling and let each kid build the tallest, most loaded taco tower!",
    ingredients:["Small corn or flour tortillas","Canned black beans or rajma (drained)","Grated cheese","Sour cream or hung dahi","Salsa or chopped tomatoes","Guacamole or mashed avocado","Shredded lettuce or cabbage","Lime wedges, hot sauce"],
    steps:[
      {safety:false, text:"Wash hands. Arrange all fillings in separate bowls in the centre of the table — the taco station is open!"},
      {safety:false, text:"Take a tortilla and lay it flat on your plate."},
      {safety:false, text:"Start with beans as your base — spread them down the centre of the tortilla."},
      {safety:false, text:"Add cheese next — it goes on while beans are still cold so it doesn't actually melt, but it's still amazing!"},
      {safety:false, text:"Add sour cream, salsa, guacamole — be as generous as you like!"},
      {safety:false, text:"Top with shredded lettuce for crunch. Squeeze a lime wedge over everything."},
      {safety:false, text:"Fold the sides in, or leave it open. The challenge: eat it without it falling apart. Good luck!"},
    ],
  },

  {
    id:116, name:"Fruit Skewer Art", hindi:"फ्रूट स्केवर", emoji:"🍡",
    cuisine:"Global", diet:"veg", level:"starter", section:"kids",
    time:"12 mins", badge:"Fruit Artist 🎨", tags:["build","healthy","fun","no-cook"],
    desc:"Thread colourful fruits onto skewers and create rainbows, flags and patterns — edible art!",
    ingredients:["Strawberries","Grapes (green and red)","Banana chunks","Pineapple chunks","Melon cubes","Kiwi slices","Wooden skewers","Honey yogurt dip (dahi + honey + cardamom)"],
    steps:[
      {safety:false, text:"Wash hands. Wash all fruits thoroughly. Cut the larger fruits into similar-sized chunks."},
      {safety:false, text:"Set out all fruits in separate bowls by colour — red, orange, yellow, green, purple."},
      {safety:false, text:"Plan your pattern first — will you do rainbow order (red→orange→yellow→green→purple)?"},
      {safety:false, text:"Carefully thread fruit onto skewers following your pattern. Pointy end away from you!"},
      {safety:false, text:"Make a dipping sauce: mix dahi with honey and a pinch of cardamom in a small bowl."},
      {safety:false, text:"Arrange your finished skewers on a plate — they should look like edible rainbows. Photo first!"},
      {safety:false, text:"Dip each fruit chunk in the honey yogurt dip before eating. Incredible!"},
    ],
  },

  {
    id:117, name:"Rainbow Salad Challenge", hindi:"रेनबो सलाद", emoji:"🌈",
    cuisine:"Global", diet:"veg", level:"starter", section:"kids",
    time:"10 mins", badge:"Rainbow Champion 🌈", tags:["build","healthy","fun","no-cook"],
    desc:"Who can make the most colourful salad using only what's in the fridge? Challenge accepted!",
    ingredients:["Whatever vegetables are in your fridge!","Olive oil or lemon juice","Salt and pepper","Any dressing or dip you like"],
    steps:[
      {safety:false, text:"Wash hands. Open the fridge and pull out every vegetable you can find."},
      {safety:false, text:"The goal: get as many DIFFERENT COLOURS as possible in one bowl. Count them as you go!"},
      {safety:false, text:"Red: tomatoes, red pepper, red onion. Orange: carrot, orange pepper. Yellow: sweetcorn, yellow pepper."},
      {safety:false, text:"Green: cucumber, lettuce, peas, avocado, green pepper. Purple: beetroot, purple cabbage, red grapes."},
      {safety:false, text:"Chop or tear everything into bite-sized pieces and add to a large bowl."},
      {safety:false, text:"Drizzle olive oil and squeeze lemon juice over everything. Add salt and pepper. Toss gently."},
      {safety:false, text:"Count your colours! 5 colours = Good. 6 colours = Great. 7 colours = RAINBOW CHAMPION!"},
    ],
  },

];


const SPECIALS = [
  {id:"birthday",  icon:"🎂",title:"Birthday Bash Corner",  color:"#EC4899",sub:"Make the cake yourself!",       recipeIds:[80,81]},
  {id:"dad",       icon:"👨‍🍳",title:"Cooking with Dad",      color:"#3B82F6",sub:"Father + kid kitchen collab!",  recipeIds:[60,82]},
  {id:"mom",       icon:"💐", title:"Mum's Day Surprise",    color:"#8B5CF6",sub:"Surprise Mum with her faves!",  recipeIds:[83,84]},
  {id:"christmas", icon:"🎄",title:"Christmas Special",      color:"#16a34a",sub:"Festive treats for the family!",recipeIds:[85]},
  {id:"diwali",    icon:"🪔",title:"Diwali Sweet Bazar",     color:"#f59e0b",sub:"Light up the kitchen!",         recipeIds:[86,6,13]},
];


// ═══════════════════════════════════════════════════════════════
// 🌍 GLOBAL RECIPE LISTS — 3 Tiers
// ═══════════════════════════════════════════════════════════════

// TIER 1: Kid does it solo — no flame, no knife, no adult needed (50 recipes)
const SOLO_RECIPES = [
  // ── DRINKS & SMOOTHIES ──────────────────────────────────────
  {id:"s01",emoji:"🥭",name:"Mango Lassi",         region:"India",    time:"5 min",  tags:["drink","sweet"],   desc:"Thick mango, yogurt and cardamom blended golden"},
  {id:"s02",emoji:"🍌",name:"Banana Peanut Shake",  region:"USA",      time:"5 min",  tags:["drink","protein"], desc:"Frozen banana + peanut butter + milk — liquid gold"},
  {id:"s03",emoji:"🍓",name:"Berry Smoothie Bowl",  region:"Australia",time:"8 min",  tags:["breakfast","veg"], desc:"Blended berries topped with granola and honey"},
  {id:"s04",emoji:"🥑",name:"Avocado Lime Shake",   region:"Mexico",   time:"5 min",  tags:["drink","veg"],     desc:"Creamy avocado + lime juice + honey blended smooth"},
  {id:"s05",emoji:"🫐",name:"Blueberry Lemonade",   region:"USA",      time:"6 min",  tags:["drink","sweet"],   desc:"Muddled blueberries + fresh lemon + sparkling water"},
  {id:"s06",emoji:"🍉",name:"Watermelon Agua Fresca",region:"Mexico",   time:"7 min",  tags:["drink","summer"],  desc:"Blended watermelon + lime + mint — summer in a glass"},
  {id:"s07",emoji:"🥥",name:"Coconut Chia Pudding", region:"Thailand", time:"10 min", tags:["breakfast","veg"], desc:"Coconut milk + chia seeds, overnight. Tropical magic"},
  {id:"s08",emoji:"🍋",name:"Honey Citrus Mocktail", region:"Global",  time:"5 min",  tags:["drink","fancy"],   desc:"Orange + lemon + honey + soda. Party in a glass"},

  // ── NO-COOK SNACKS & SANDWICHES ─────────────────────────────
  {id:"s09",emoji:"🥙",name:"Caprese Skewers",      region:"Italy",    time:"10 min", tags:["snack","veg"],     desc:"Tomato + mozzarella + basil + olive oil on a stick"},
  {id:"s10",emoji:"🥑",name:"Classic Guacamole",    region:"Mexico",   time:"8 min",  tags:["snack","veg"],     desc:"Mashed avocado + lime + garlic + coriander — the real deal"},
  {id:"s11",emoji:"🧀",name:"Cheese Quesadilla",    region:"Mexico",   time:"8 min",  tags:["snack","veg"],     desc:"Tortilla + cheese + black beans, toasted crispy cold-pan style"},
  {id:"s12",emoji:"🥜",name:"Peanut Butter Bites",  region:"USA",      time:"10 min", tags:["snack","sweet"],   desc:"Oats + peanut butter + honey + choc chips — rolled into balls"},
  {id:"s13",emoji:"🍞",name:"French Bruschetta",    region:"France",   time:"8 min",  tags:["snack","veg"],     desc:"Toasted bread rubbed with garlic + diced tomato + basil"},
  {id:"s14",emoji:"🥒",name:"Greek Cucumber Bites", region:"Greece",   time:"10 min", tags:["snack","veg"],     desc:"Cucumber rounds + cream cheese + dill + smoked paprika"},
  {id:"s15",emoji:"🫙",name:"Hummus from Scratch",  region:"Lebanon",  time:"8 min",  tags:["snack","veg"],     desc:"Canned chickpeas blended with tahini + lemon + garlic"},
  {id:"s16",emoji:"🌯",name:"Rainbow Veggie Wrap",  region:"USA",      time:"10 min", tags:["lunch","veg"],     desc:"Tortilla + hummus + every coloured veggie you can find"},
  {id:"s17",emoji:"🥗",name:"Waldorf Salad",         region:"USA",      time:"10 min", tags:["lunch","veg"],     desc:"Apple + celery + walnuts + grapes + mayo — New York classic"},
  {id:"s18",emoji:"🍅",name:"Caprese Salad",         region:"Italy",    time:"7 min",  tags:["lunch","veg"],     desc:"Sliced tomato + buffalo mozzarella + basil + balsamic glaze"},

  // ── SWEET NO-BAKE TREATS ─────────────────────────────────────
  {id:"s19",emoji:"🍫",name:"Chocolate Truffles",   region:"France",   time:"20 min", tags:["sweet","special"], desc:"Melted chocolate + cream + cocoa powder — rolled silky spheres"},
  {id:"s20",emoji:"🥜",name:"Nutella Stuffed Dates", region:"Morocco", time:"8 min",  tags:["sweet","veg"],     desc:"Medjool dates + Nutella + crushed pistachios. 3 ingredients"},
  {id:"s21",emoji:"🍓",name:"Strawberry Cheesecake Cups",region:"USA", time:"15 min", tags:["sweet","fancy"],   desc:"Crushed biscuit + cream cheese + jam — no bake, no oven"},
  {id:"s22",emoji:"🌰",name:"Coconut Energy Balls",  region:"Australia",time:"15 min", tags:["sweet","healthy"], desc:"Oats + honey + coconut + dates blended and rolled"},
  {id:"s23",emoji:"🍌",name:"Frozen Banana Pops",    region:"USA",      time:"10 min", tags:["sweet","summer"],  desc:"Banana halves dipped in chocolate + sprinkles, then frozen"},
  {id:"s24",emoji:"🍮",name:"Mango Mousse",           region:"India",    time:"15 min", tags:["sweet","fancy"],   desc:"Mango pulp + whipped cream + cardamom — cloud-like dessert"},
  {id:"s25",emoji:"🫐",name:"Açaí Bowl",              region:"Brazil",   time:"10 min", tags:["breakfast","veg"], desc:"Frozen açaí + banana blended thick + colourful toppings"},
  {id:"s26",emoji:"🍰",name:"Oreo Icebox Cake",       region:"USA",      time:"15 min", tags:["sweet","special"], desc:"Layers of Oreos + whipped cream, refrigerated overnight"},
  {id:"s27",emoji:"🍡",name:"Japanese Mochi Bites",   region:"Japan",    time:"20 min", tags:["sweet","global"],  desc:"Rice flour + sugar + water microwaved, filled with ice cream"},
  {id:"s28",emoji:"🧁",name:"Mug Cake",               region:"USA",      time:"4 min",  tags:["sweet","quick"],   desc:"Flour + egg + cocoa + milk microwaved — cake in 90 seconds"},

  // ── GLOBAL COLD DISHES ───────────────────────────────────────
  {id:"s29",emoji:"🌮",name:"No-Cook Tacos",          region:"Mexico",   time:"10 min", tags:["lunch","fun"],     desc:"Canned beans + salsa + avocado + cheese in a cold tortilla"},
  {id:"s30",emoji:"🥗",name:"Greek Salad",             region:"Greece",   time:"10 min", tags:["lunch","veg"],     desc:"Cucumber + tomato + feta + olives + oregano + olive oil"},
  {id:"s31",emoji:"🫙",name:"Overnight Oats",          region:"Switzerland",time:"5 min",tags:["breakfast","healthy"],"desc":"Oats + milk + yogurt + chia + fruit — prep tonight, eat tomorrow"},
  {id:"s32",emoji:"🍱",name:"Onigiri Rice Balls",      region:"Japan",    time:"15 min", tags:["lunch","fun"],     desc:"Cooked rice pressed into triangles, filled with tuna mayo"},
  {id:"s33",emoji:"🥙",name:"Pita Pockets",            region:"Greece",   time:"8 min",  tags:["lunch","fun"],     desc:"Pita + tzatziki + veggies + feta — stuffed street-food style"},
  {id:"s34",emoji:"🫙",name:"Mason Jar Salad",         region:"USA",      time:"10 min", tags:["lunch","healthy"], desc:"Layer grains + veggies + dressing in a jar — stays fresh all day"},
  {id:"s35",emoji:"🍙",name:"Californian Rice Bowl",   region:"USA",      time:"10 min", tags:["lunch","global"],  desc:"Rice + avocado + cucumber + nori + soy — sushi bowl vibes"},
  {id:"s36",emoji:"🥣",name:"Swiss Bircher Muesli",    region:"Switzerland",time:"5 min",tags:["breakfast","healthy"],"desc":"Oats + apple + milk + nuts soaked overnight — alpine breakfast"},

  // ── SPREADS & DIPS ───────────────────────────────────────────
  {id:"s37",emoji:"🫙",name:"Tzatziki",                region:"Greece",   time:"8 min",  tags:["snack","veg"],     desc:"Grated cucumber + Greek yogurt + garlic + dill. Perfect dip"},
  {id:"s38",emoji:"🫙",name:"Baba Ganoush",            region:"Lebanon",  time:"10 min", tags:["snack","veg"],     desc:"Roasted eggplant (from jar) + tahini + lemon — smoky magic"},
  {id:"s39",emoji:"🥜",name:"Almond Butter",           region:"USA",      time:"15 min", tags:["snack","healthy"], desc:"Roasted almonds blended in food processor — just one ingredient"},
  {id:"s40",emoji:"🍓",name:"Strawberry Jam Shortcut", region:"UK",       time:"10 min", tags:["sweet","veg"],     desc:"Macerated strawberries + sugar + lemon — quick refrigerator jam"},

  // ── SNAPPY GLOBAL BITES ──────────────────────────────────────
  {id:"s41",emoji:"🧆",name:"No-Fry Falafel Bites",   region:"Israel",   time:"15 min", tags:["snack","veg"],     desc:"Canned chickpeas + herbs + spices — formed into balls, chilled"},
  {id:"s42",emoji:"🥐",name:"Croissant Sandwich",      region:"France",   time:"5 min",  tags:["breakfast","fun"], desc:"Croissant + ham + cheese + dijon mustard — Parisian picnic"},
  {id:"s43",emoji:"🍱",name:"Bento Box",               region:"Japan",    time:"15 min", tags:["lunch","fun"],     desc:"Rice + protein + veggies arranged artistically in a box"},
  {id:"s44",emoji:"🌯",name:"Korean Kimbap Rolls",     region:"Korea",    time:"20 min", tags:["lunch","global"],  desc:"Nori + rice + cucumber + carrot + egg (pre-cooked) rolled tight"},
  {id:"s45",emoji:"🫙",name:"Gazpacho",                region:"Spain",    time:"10 min", tags:["lunch","cold"],    desc:"Blended tomato + cucumber + pepper + garlic — chilled Spanish soup"},
  {id:"s46",emoji:"🥗",name:"Thai Peanut Noodle Salad",region:"Thailand", time:"15 min", tags:["lunch","global"],  desc:"Rice noodles + peanut sauce + cucumber + carrot + coriander"},
  {id:"s47",emoji:"🥜",name:"Vietnamese Spring Rolls", region:"Vietnam",  time:"20 min", tags:["lunch","global"],  desc:"Rice paper + shrimp/tofu + veggies + herbs rolled fresh, no fry"},
  {id:"s48",emoji:"🍞",name:"Avocado Toast 5 Ways",    region:"Australia",time:"8 min",  tags:["breakfast","fun"], desc:"5 epic avocado toast styles — classic, spicy, egg, feta, mango"},
  {id:"s49",emoji:"🫙",name:"Mango Salsa",             region:"Mexico",   time:"8 min",  tags:["snack","sweet"],   desc:"Diced mango + red onion + jalapeño + coriander + lime. Wow."},
  {id:"s50",emoji:"🍰",name:"No-Bake Cheesecake Slice",region:"USA",      time:"20 min", tags:["sweet","fancy"],   desc:"Biscuit base + cream cheese + lemon curd filling, chilled set"},

  // ── 🇮🇳 INDIAN SNACKS & QUICK BITES ─────────────────────────
  {id:"i01",emoji:"🧀",name:"Cheese Corn Sandwich",     region:"India",    time:"8 min",  tags:["snack","indian"],  desc:"Buttered bread + sweet corn + cheese + green chutney — Mumbai street style"},
  {id:"i02",emoji:"🌿",name:"Mint Chutney Sandwich",    region:"India",    time:"6 min",  tags:["snack","indian"],  desc:"Fresh mint chutney spread thick between soft bread with cucumber rounds"},
  {id:"i03",emoji:"🍓",name:"Jam Coconut Sandwich",     region:"India",    time:"5 min",  tags:["snack","sweet"],   desc:"Strawberry jam + desiccated coconut on buttered bread — tiffin classic"},
  {id:"i04",emoji:"🍯",name:"Malai Sugar Toast",        region:"India",    time:"5 min",  tags:["snack","sweet"],   desc:"Fresh cream + sugar + cardamom spread on toast — simple Punjabi joy"},
  {id:"i05",emoji:"🥛",name:"Paneer Stuffed Bread Rolls",region:"India",   time:"12 min", tags:["snack","indian"],  desc:"Mashed spiced paneer rolled inside bread slices — no fry, just press"},
  {id:"i06",emoji:"🌯",name:"Roti Wrap with Veggies",   region:"India",    time:"8 min",  tags:["lunch","indian"],  desc:"Leftover roti + coriander chutney + crunchy veggies + cheese rolled tight"},
  {id:"i07",emoji:"🧀",name:"Cream Cheese Veggie Roll",  region:"India",   time:"8 min",  tags:["snack","fusion"],  desc:"Cream cheese + colourful peppers + cucumber rolled in a soft tortilla"},

  // ── 🥗 INDIAN CHAAT & STREET FOOD ────────────────────────────
  {id:"i08",emoji:"🌶️",name:"Sev Puri",                region:"India",    time:"10 min", tags:["chaat","fun"],     desc:"Crispy puris topped with potato + chutneys + sev + pomegranate — assembly art"},
  {id:"i09",emoji:"✨",name:"Papdi Chaat",              region:"India",    time:"12 min", tags:["chaat","fun"],     desc:"Papdi + potatoes + chickpeas + dahi + tamarind + green chutney tower"},
  {id:"i10",emoji:"🫘",name:"Rajma Chaat",              region:"India",    time:"8 min",  tags:["chaat","protein"], desc:"Boiled rajma + onion + tomato + chaat masala + lemon — power snack"},
  {id:"i11",emoji:"🌱",name:"Moong Dal Chaat",          region:"India",    time:"8 min",  tags:["chaat","healthy"], desc:"Soaked moong dal + onion + tomato + coriander + lemon — living food"},
  {id:"i12",emoji:"🥣",name:"Boondi Raita",             region:"India",    time:"6 min",  tags:["side","indian"],   desc:"Crispy boondi + thick dahi + cumin powder + mint — cooling side"},
  {id:"i13",emoji:"🥗",name:"Veg Raita Bowl",           region:"India",    time:"8 min",  tags:["side","healthy"],  desc:"Grated cucumber + carrot + beetroot + dahi + roasted cumin — rainbow bowl"},
  {id:"i14",emoji:"🥒",name:"Cucumber Peanut Salad",    region:"India",    time:"8 min",  tags:["salad","south"],   desc:"Kosambari — diced cucumber + soaked moong + grated coconut + lemon"},
  {id:"i15",emoji:"🥕",name:"Carrot Beetroot Salad",    region:"India",    time:"8 min",  tags:["salad","healthy"], desc:"Grated carrot + beetroot + lemon + chaat masala + coriander — vivid and fresh"},

  // ── 🍚 INDIAN COMFORT BOWLS ───────────────────────────────────
  {id:"i16",emoji:"🍋",name:"Lemon Rice Bowl",          region:"India",    time:"8 min",  tags:["rice","south"],    desc:"Pre-cooked rice + lemon juice + roasted peanuts + turmeric + coriander"},
  {id:"i17",emoji:"🥣",name:"Curd Poha",               region:"India",    time:"8 min",  tags:["breakfast","indian"],desc:"Soaked poha + thick dahi + sugar + salt + pomegranate — Gujarat morning"},
  {id:"i18",emoji:"🍚",name:"Masala Curd Rice Bowl",   region:"India",    time:"8 min",  tags:["rice","south"],    desc:"Pre-cooked rice + curd + grated carrot + cucumber + mustard + curry leaves"},
  {id:"i19",emoji:"🍌",name:"Sweet Banana Poha",       region:"India",    time:"6 min",  tags:["breakfast","sweet"],desc:"Soaked poha + mashed banana + honey + cardamom + coconut — Kerala breakfast"},
  {id:"i20",emoji:"🥥",name:"Aval Sweet Mix",          region:"India",    time:"8 min",  tags:["sweet","kerala"],  desc:"Beaten rice + jaggery + coconut + cardamom + banana — Krishna Jayanti classic"},
  {id:"i21",emoji:"🥣",name:"Cold Khichdi Mix",        region:"India",    time:"6 min",  tags:["comfort","indian"],desc:"Pre-cooked khichdi + cold yogurt + a drizzle of ghee + pickle — winter comfort"},

  // ── 🍬 INDIAN SWEETS & TREATS ────────────────────────────────
  {id:"i22",emoji:"🎂",name:"Biscuit Cake",             region:"India",    time:"20 min", tags:["sweet","no-bake"], desc:"Marie biscuits + milk + chocolate — layered into a no-bake fridge cake"},
  {id:"i23",emoji:"🍫",name:"Marie Biscuit Chocolate Rolls",region:"India",time:"15 min",tags:["sweet","fun"],    desc:"Marie biscuit crumbs + cocoa + butter + milk rolled into truffles"},
  {id:"i24",emoji:"🌰",name:"Dry Fruit Ladoo",          region:"India",    time:"15 min", tags:["sweet","healthy"], desc:"Medjool dates + mixed nuts blended and rolled — natural energy balls"},
  {id:"i25",emoji:"⚪",name:"Til Gud Ladoo",            region:"India",    time:"10 min", tags:["sweet","winter"],  desc:"Pre-mixed sesame + jaggery + ghee rolled into small spheres — Makar Sankranti"},
  {id:"i26",emoji:"🥭",name:"Mango Shrikhand",          region:"India",    time:"10 min", tags:["sweet","gujarati"],desc:"Hung curd + mango pulp + sugar + cardamom + saffron — Maharashtra favourite"},
  {id:"i27",emoji:"🍓",name:"Flavored Yogurt",          region:"India",    time:"5 min",  tags:["sweet","healthy"], desc:"Thick dahi + any fruit + honey + a pinch of cardamom — customise freely"},
  {id:"i28",emoji:"🌹",name:"Rose Milk Dessert Cup",    region:"India",    time:"6 min",  tags:["sweet","drink"],   desc:"Cold milk + rose syrup + basil seeds soaked + ice — Tamil Nadu special"},
  {id:"i29",emoji:"🟡",name:"Sooji Ladoo",              region:"India",    time:"12 min", tags:["sweet","indian"],  desc:"Pre-roasted suji + sugar + ghee + cardamom + cashews — rolled warm"},

  // ── 🧃 INDIAN DRINKS ─────────────────────────────────────────
  {id:"i30",emoji:"🍋",name:"Nimbu Pani",               region:"India",    time:"5 min",  tags:["drink","summer"],  desc:"Fresh lemon + sugar + black salt + cumin + mint — India's original lemonade"},
  {id:"i31",emoji:"🥛",name:"Masala Chaas",             region:"India",    time:"5 min",  tags:["drink","cooling"], desc:"Yogurt + water + cumin + coriander + green chilli blended — digestion magic"},
  {id:"i32",emoji:"🥭",name:"Mango Milkshake",          region:"India",    time:"5 min",  tags:["drink","sweet"],   desc:"Alphonso mango + full fat milk + sugar + cardamom blended thick"},
  {id:"i33",emoji:"🍌",name:"Banana Shake",             region:"India",    time:"5 min",  tags:["drink","protein"], desc:"Ripe banana + milk + honey + a pinch of cinnamon — India's gym shake"},
  {id:"i34",emoji:"☕",name:"Cold Coffee Kids Version", region:"India",    time:"6 min",  tags:["drink","fun"],     desc:"Cold milk + coffee powder + ice cream + sugar blended — no strong coffee"},
  {id:"i35",emoji:"🍓",name:"Strawberry Milk",          region:"India",    time:"5 min",  tags:["drink","sweet"],   desc:"Fresh or frozen strawberries + cold milk + honey blended — pink perfection"},
  {id:"i36",emoji:"🌹",name:"Rooh Afza Milk Drink",     region:"India",    time:"3 min",  tags:["drink","sweet"],   desc:"Cold milk + Rooh Afza + basil seeds + ice — summer classic from the bottle"},
  {id:"i37",emoji:"🍹",name:"Fruit Smoothie Freestyle", region:"India",    time:"5 min",  tags:["drink","healthy"], desc:"Any 2 fruits + yogurt + honey + ice blended — different every single time"},

  // ── 🥪 GLOBAL SANDWICHES & WRAPS ─────────────────────────────
  {id:"g01",emoji:"🫙",name:"Hummus Veggie Sandwich",   region:"Lebanon",  time:"8 min",  tags:["lunch","veg"],     desc:"Thick hummus + roasted peppers + cucumber + spinach on wholegrain"},
  {id:"g02",emoji:"🥑",name:"Avocado Toast Kid-Friendly",region:"Australia",time:"7 min", tags:["breakfast","veg"], desc:"Smashed avocado + lemon + salt + optional egg + tomato on thick toast"},
  {id:"g03",emoji:"🌯",name:"Tortilla Veg Roll",        region:"Mexico",   time:"8 min",  tags:["lunch","veg"],     desc:"Flour tortilla + refried beans + cheese + salsa + lettuce — easy burrito"},
  {id:"g04",emoji:"🧀",name:"Cheese and Crackers Platter",region:"UK",     time:"8 min",  tags:["snack","fun"],     desc:"3 cheeses + crackers + grapes + fig jam + nuts — DIY grazing board"},
  {id:"g05",emoji:"🌀",name:"Pinwheel Sandwich Rolls",  region:"USA",      time:"12 min", tags:["snack","fun"],     desc:"Cream cheese + deli meat + spinach + tortilla rolled tight and sliced"},
  {id:"g06",emoji:"🥚",name:"Egg Mayo Sandwich",        region:"UK",       time:"8 min",  tags:["lunch","protein"], desc:"Mashed boiled eggs + mayo + mustard + cress — British classic done right"},

  // ── 🥗 GLOBAL SALADS & BOWLS ──────────────────────────────────
  {id:"g07",emoji:"🍝",name:"Pasta Salad",              region:"Italy",    time:"10 min", tags:["lunch","veg"],     desc:"Pre-cooked pasta + olives + sun-dried tomato + feta + pesto — cold Italian"},
  {id:"g08",emoji:"🥗",name:"Greek Salad",              region:"Greece",   time:"8 min",  tags:["lunch","veg"],     desc:"Cucumber + tomato + feta + kalamata olives + oregano + olive oil"},
  {id:"g09",emoji:"🌈",name:"Rainbow Veg Bowl",         region:"Global",   time:"12 min", tags:["lunch","healthy"], desc:"Red pepper + orange carrot + yellow corn + green cucumber + purple cabbage"},
  {id:"g10",emoji:"🍜",name:"Cold Noodle Salad",        region:"Asia",     time:"10 min", tags:["lunch","global"],  desc:"Pre-cooked noodles + peanut sauce + shredded carrot + cucumber + sesame"},
  {id:"g11",emoji:"🫘",name:"Bean Salad",               region:"USA",      time:"8 min",  tags:["lunch","protein"], desc:"Canned mixed beans + red onion + parsley + olive oil + red wine vinegar"},

  // ── 🌮 GLOBAL ASSEMBLY FOODS ─────────────────────────────────
  {id:"g12",emoji:"🌮",name:"Mini Tacos",               region:"Mexico",   time:"10 min", tags:["lunch","fun"],     desc:"Mini tortillas + canned beans + cheese + salsa + sour cream + guac"},
  {id:"g13",emoji:"🧆",name:"Nacho Platter",            region:"Mexico",   time:"8 min",  tags:["snack","fun"],     desc:"Tortilla chips + salsa + guacamole + cheese dip + jalapeños — party plate"},
  {id:"g14",emoji:"🍕",name:"DIY Bread Pizza",          region:"Italy",    time:"10 min", tags:["snack","fun"],     desc:"Bread slice + tomato paste + cheese + toppings — no bake, no oven needed"},
  {id:"g15",emoji:"🥙",name:"Stuffed Pita Pockets",     region:"Greece",   time:"10 min", tags:["lunch","global"],  desc:"Pita + tzatziki + falafel (from packet) + salad + pickled veg"},
  {id:"g16",emoji:"🌀",name:"Rice Paper Rolls",         region:"Vietnam",  time:"15 min", tags:["lunch","healthy"], desc:"Soaked rice paper + vermicelli + tofu + carrot + herbs — fresh Vietnamese"},

  // ── 🍨 GLOBAL DESSERTS & FUN FOODS ───────────────────────────
  {id:"g17",emoji:"🍮",name:"No-Bake Cheesecake Cups",  region:"USA",      time:"15 min", tags:["sweet","fun"],     desc:"Crushed biscuit + cream cheese + jam in individual cups — no oven"},
  {id:"g18",emoji:"🍌",name:"Chocolate Banana Pops",    region:"USA",      time:"10 min", tags:["sweet","summer"],  desc:"Banana halves dipped in melted chocolate + sprinkles — freeze 2 hrs"},
  {id:"g19",emoji:"🍫",name:"Oreo Truffles",            region:"USA",      time:"15 min", tags:["sweet","fun"],     desc:"Crushed Oreos + cream cheese rolled into balls + dipped in chocolate"},
  {id:"g20",emoji:"🍨",name:"Ice Cream Sundae Bar",     region:"USA",      time:"10 min", tags:["sweet","build"],   desc:"Scoops + 6 toppings + sauces + wafers — fully customised by the kid"},
  {id:"g21",emoji:"🍮",name:"Fruit Custard",            region:"Global",   time:"8 min",  tags:["sweet","fruit"],   desc:"Ready custard + mixed cut fruits + toasted nuts + a drizzle of honey"},
  {id:"g22",emoji:"🍓",name:"Chocolate Dip Fruits",     region:"Global",   time:"10 min", tags:["sweet","healthy"], desc:"Strawberries + banana + pineapple dipped in melted chocolate + sprinkles"},
  {id:"g23",emoji:"⚡",name:"Peanut Butter Energy Bites",region:"USA",     time:"12 min", tags:["snack","healthy"], desc:"Oats + peanut butter + honey + chocolate chips + flaxseed — rolled balls"},

  // ── 🎉 BUILD-YOUR-OWN (HIGH ENGAGEMENT) ──────────────────────
  {id:"b01",emoji:"🥪",name:"Make Your Own Sandwich Bar",region:"Global",  time:"15 min", tags:["build","fun"],     desc:"Set out 8 fillings + 4 breads + 5 spreads — every kid makes their masterpiece"},
  {id:"b02",emoji:"🌶️",name:"DIY Chaat Plate",          region:"India",   time:"12 min", tags:["build","chaat"],   desc:"Set out papdi + potatoes + dahi + both chutneys + sev — each plate is unique"},
  {id:"b03",emoji:"🍓",name:"Make Your Own Smoothie Bowl",region:"Global", time:"10 min", tags:["build","healthy"], desc:"Blended base + 10 topping choices — kids design their own edible artwork"},
  {id:"b04",emoji:"🌮",name:"Taco Assembly Station",     region:"Mexico",  time:"12 min", tags:["build","fun"],     desc:"Lay out every filling and let each kid build the tallest taco tower"},
  {id:"b05",emoji:"🍮",name:"Mini Dessert Cup Decoration",region:"Global", time:"15 min", tags:["build","sweet"],   desc:"Plain yogurt cups + fruits + crushed biscuits + sauces — decorate and eat"},
  {id:"b06",emoji:"🍡",name:"Fruit Skewer Art",          region:"Global",  time:"12 min", tags:["build","healthy"], desc:"10 coloured fruits + wooden skewers — make rainbows, flags, patterns"},
  {id:"b07",emoji:"🌈",name:"Rainbow Salad Challenge",   region:"Global",  time:"10 min", tags:["build","healthy"], desc:"Who can make the most colourful salad using only what's in the fridge?"},
];

// TIER 2: Kid + Adult Together — 25 recipes where kid does most, adult handles heat
const TEAM_RECIPES = [
  {id:"t01",emoji:"🍳",name:"Fluffy American Pancakes",    region:"USA",       time:"20 min", tags:["breakfast","sweet"],  desc:"Kid mixes, adult flips — golden stacks with maple syrup"},
  {id:"t02",emoji:"🍜",name:"Japanese Ramen from Scratch", region:"Japan",     time:"25 min", tags:["dinner","global"],    desc:"Kid preps toppings, adult makes broth — restaurant-quality at home"},
  {id:"t03",emoji:"🍝",name:"Spaghetti Aglio e Olio",      region:"Italy",     time:"20 min", tags:["dinner","veg"],       desc:"Kid measures + boils pasta, adult handles the garlic olive oil"},
  {id:"t04",emoji:"🥘",name:"Spanish Paella",              region:"Spain",     time:"30 min", tags:["dinner","global"],    desc:"Kid preps seafood + saffron, adult manages the socarrat"},
  {id:"t05",emoji:"🍛",name:"Thai Green Curry",            region:"Thailand",  time:"25 min", tags:["dinner","global"],    desc:"Kid makes curry paste, adult cooks the coconut broth"},
  {id:"t06",emoji:"🌮",name:"Chicken Tacos",                  region:"Mexico",    time:"20 min", tags:["dinner","non-veg"],   desc:"Kid preps toppings + assembles, adult cooks the seasoned chicken"},
  {id:"t07",emoji:"🍕",name:"Homemade Pizza",              region:"Italy",     time:"30 min", tags:["dinner","fun"],       desc:"Kid makes dough + adds toppings, adult handles the hot oven"},
  {id:"t08",emoji:"🥞",name:"French Crêpes",               region:"France",    time:"20 min", tags:["breakfast","global"], desc:"Kid whisks batter + fills them, adult handles the thin flip"},
  {id:"t09",emoji:"🍲",name:"Moroccan Tagine",             region:"Morocco",   time:"30 min", tags:["dinner","global"],    desc:"Kid layers spices + veg, adult slow-cooks the rich stew"},
  {id:"t10",emoji:"🥗",name:"Warm Niçoise Salad",          region:"France",    time:"25 min", tags:["lunch","global"],     desc:"Kid assembles greens + tuna, adult boils eggs + green beans"},
  {id:"t11",emoji:"🍜",name:"Pad Thai",                    region:"Thailand",  time:"20 min", tags:["dinner","global"],    desc:"Kid soaks noodles + preps, adult woks the tamarind sauce"},
  {id:"t12",emoji:"🥩",name:"Chicken Schnitzel",           region:"Austria",   time:"25 min", tags:["dinner","non-veg"],   desc:"Kid breadcrumbs the chicken, adult pan-fries it golden"},
  {id:"t13",emoji:"🍲",name:"Minestrone Soup",             region:"Italy",     time:"30 min", tags:["dinner","veg"],       desc:"Kid chops all vegetables, adult builds the tomato broth"},
  {id:"t14",emoji:"🥘",name:"Shakshuka",                   region:"Israel",    time:"20 min", tags:["breakfast","global"], desc:"Kid makes the tomato sauce, adult poaches the eggs inside"},
  {id:"t15",emoji:"🍚",name:"Chicken Fried Rice",          region:"China",     time:"20 min", tags:["dinner","non-veg"],   desc:"Kid preps vegetables + eggs, adult does the wok-toss"},
  {id:"t16",emoji:"🌮",name:"Korean BBQ Bowls",            region:"Korea",     time:"25 min", tags:["dinner","global"],    desc:"Kid marinates + makes banchan, adult grills the chicken or tofu bulgogi"},
  {id:"t17",emoji:"🍛",name:"Butter Chicken",              region:"India",     time:"30 min", tags:["dinner","non-veg"],   desc:"Kid marinates chicken + preps masala, adult handles the handi"},
  {id:"t18",emoji:"🥗",name:"Caesar Salad with Croutons",  region:"Mexico",    time:"20 min", tags:["lunch","fun"],        desc:"Kid makes dressing + tears lettuce, adult toasts croutons"},
  {id:"t19",emoji:"🍲",name:"French Onion Soup",           region:"France",    time:"35 min", tags:["dinner","global"],    desc:"Kid peels onions + grates cheese, adult caramelises + broils"},
  {id:"t20",emoji:"🥙",name:"Falafel Wraps",               region:"Lebanon",   time:"25 min", tags:["lunch","veg"],        desc:"Kid makes falafel mix + wraps, adult fries the falafel"},
  {id:"t21",emoji:"🍜",name:"Vietnamese Pho",              region:"Vietnam",   time:"30 min", tags:["dinner","global"],    desc:"Kid preps herbs + noodles + toppings, adult makes the broth"},
  {id:"t22",emoji:"🥘",name:"Spanish Tortilla",            region:"Spain",     time:"25 min", tags:["dinner","veg"],       desc:"Kid slices potatoes + beats eggs, adult does the flip"},
  {id:"t23",emoji:"🫕",name:"Bibimbap",                    region:"Korea",     time:"25 min", tags:["dinner","global"],    desc:"Kid prepares vegetables + assembles bowl, adult cooks the rice"},
  {id:"t24",emoji:"🍲",name:"Lentil Dahl",                 region:"India",     time:"25 min", tags:["dinner","veg"],       desc:"Kid measures spices + washes lentils, adult handles the tadka"},
  {id:"t25",emoji:"🥗",name:"Tabbouleh",                   region:"Lebanon",   time:"20 min", tags:["lunch","veg"],        desc:"Kid chops herbs + mixes bulgur, adult guides the knife work"},
];

// TIER 3: Parent leads, kid assists — 15 recipes where kid has specific jobs
const PARENT_RECIPES = [
  {id:"p01",emoji:"🥧",name:"Mushroom Wellington",  region:"UK",       time:"90 min", tags:["special","veg"],    kidJob:"Wraps the mushroom filling in pastry + brushes egg wash", desc:"Epic veggie centrepiece — kid does the dramatic puff pastry wrapping"},
  {id:"p02",emoji:"🍞",name:"Sourdough Bread",      region:"France",   time:"3 hrs",  tags:["special","veg"],    kidJob:"Kneads dough + shapes the loaf", desc:"Kid develops the gluten through kneading — therapeutic and powerful"},
  {id:"p03",emoji:"🍮",name:"Crème Brûlée",         region:"France",   time:"60 min", tags:["sweet","special"],  kidJob:"Mixes custard + sprinkles sugar on top", desc:"Kid torches the sugar crust with supervision — pure drama"},
  {id:"p04",emoji:"🫕",name:"French Cassoulet",     region:"France",   time:"3 hrs",  tags:["special","non-veg"],kidJob:"Soaks beans + layers the casserole", desc:"Kid does methodical layering of this slow-cooked French classic"},
  {id:"p05",emoji:"🍣",name:"Sushi Platter",         region:"Japan",    time:"60 min", tags:["special","global"], kidJob:"Fans rice + rolls maki + arranges platter", desc:"Kid becomes the sushi artist — rolling, pressing, plating"},
  {id:"p06",emoji:"🎂",name:"Layered Birthday Cake", region:"USA",      time:"2 hrs",  tags:["sweet","special"],  kidJob:"Mixes batter + decorates with buttercream", desc:"Kid's design on top — their creativity stars"},
  {id:"p07",emoji:"🥩",name:"Whole Roast Chicken",  region:"France",   time:"90 min", tags:["special","non-veg"],kidJob:"Herbs the butter + massages the bird", desc:"Kid does the messy, fun job of butter-herb massage"},
  {id:"p08",emoji:"🍜",name:"Homemade Fresh Pasta",  region:"Italy",    time:"60 min", tags:["special","veg"],    kidJob:"Kneads pasta dough + cranks the pasta machine", desc:"Kid loves the pasta machine — total sensory joy"},
  {id:"p09",emoji:"🫕",name:"Lamb Biryani",          region:"India",    time:"2 hrs",  tags:["special","non-veg"],kidJob:"Layers saffron rice + fries onions", desc:"Kid does the dum layering — the most exciting part"},
  {id:"p10",emoji:"🥐",name:"Croissants from Scratch",region:"France",  time:"3 hrs",  tags:["sweet","special"],  kidJob:"Rolls + folds the laminated dough", desc:"Kid does the folding and rolling — learning butter lamination"},
  {id:"p11",emoji:"🍲",name:"Chicken Chasseur",     region:"France",   time:"2 hrs",  tags:["special","non-veg"],kidJob:"Peels vegetables + prepares the herb garnish", desc:"Kid preps while parent slow-cooks this classic French hunter's chicken"},
  {id:"p12",emoji:"🍣",name:"Whole Salmon en Croûte",region:"France",   time:"60 min", tags:["special","non-veg"],kidJob:"Wraps salmon in pastry + seals edges", desc:"Kid does dramatic pastry wrapping of the whole fish"},
  {id:"p13",emoji:"🎂",name:"Baked Brie en Croûte",  region:"France",   time:"45 min", tags:["special","veg"],    kidJob:"Wraps brie in puff pastry + decorates top", desc:"Kid creates the pastry wrapping — always a showstopper"},
  {id:"p14",emoji:"🍕",name:"Neapolitan Pizza",      region:"Italy",    time:"2 hrs",  tags:["special","veg"],    kidJob:"Stretches dough by hand + sauces the pizza", desc:"Kid hand-stretches authentic Neapolitan dough"},
  {id:"p15",emoji:"🍮",name:"Chocolate Soufflé",     region:"France",   time:"45 min", tags:["sweet","special"],  kidJob:"Folds egg whites + butters the ramekins", desc:"Kid masters the delicate fold — the crucial soufflé skill"},
];

// ═══════════════════════════════════════════════════════════════
// 🎨  ONBOARDING — Cinematic, playful, world-class design
//     Aesthetic: Bold dark splash → warm profile builder → 
//     animated avatar picker → playful food-theming throughout
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// 🎨  SIZZLE — Male Chef (bold, urban, flame-orange + charcoal)
// ═══════════════════════════════════════════════════════════════
function Sizzle({ mood="happy", size=100, speaking=false }) {
  const M = {
    happy:     {mouth:"M 43 67 Q 50 75 57 67", cheek:"#FCA5A5", eyes:"cool"},
    excited:   {mouth:"M 41 65 Q 50 79 59 65", cheek:"#F87171", eyes:"big"},
    warning:   {mouth:"M 44 70 Q 50 65 56 70", cheek:"#FDE68A", eyes:"cool"},
    listening: {mouth:"M 45 68 Q 50 73 55 68", cheek:"#93C5FD", eyes:"cool"},
  }[mood] || {};
  return (
    <svg width={size} height={size*1.22} viewBox="0 0 100 122"
      style={{filter:"drop-shadow(0 6px 18px rgba(0,0,0,0.18))",
              animation:speaking?"sizzle-talk 0.28s ease-in-out infinite alternate":"sizzle-float 2.8s ease-in-out infinite"}}>
      <ellipse cx="50" cy="30" rx="27" ry="10" fill="#1c1917" stroke="#292524" strokeWidth="1"/>
      <rect x="29" y="11" width="42" height="22" rx="9" fill="#1c1917" stroke="#292524" strokeWidth="1"/>
      <ellipse cx="50" cy="11" rx="15" ry="9" fill="#1c1917"/>
      <rect x="29" y="30" width="42" height="6" rx="3" fill="url(#flameGrad)"/>
      <defs>
        <linearGradient id="flameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B35"/>
          <stop offset="50%" stopColor="#f97316"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
      <path d="M 28 36 Q 50 39 72 36" stroke="#374151" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="50" cy="55" r="23" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5"/>
      <circle cx="50" cy="55" r="21.5" fill="#FEF3C7"/>
      {M.eyes==="big"
        ? <><circle cx="43" cy="52" r="5.5" fill="white" stroke="#1c1917" strokeWidth="1.5"/><circle cx="57" cy="52" r="5.5" fill="white" stroke="#1c1917" strokeWidth="1.5"/><circle cx="44.5" cy="53" r="2.5" fill="#1c1917"/><circle cx="58.5" cy="53" r="2.5" fill="#1c1917"/></>
        : <><path d="M 39 52 Q 43 47 47 52" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M 53 52 Q 57 47 61 52" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round"/></>}
      <circle cx="36" cy="60" r="6" fill={M.cheek} opacity="0.5"/>
      <circle cx="64" cy="60" r="6" fill={M.cheek} opacity="0.5"/>
      <path d={M.mouth} stroke="#78350f" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <circle cx="44" cy="65" r="1.2" fill="#92400e" opacity="0.4"/>
      <circle cx="47" cy="67" r="1.2" fill="#92400e" opacity="0.4"/>
      <circle cx="50" cy="67" r="1.2" fill="#92400e" opacity="0.4"/>
      <circle cx="53" cy="67" r="1.2" fill="#92400e" opacity="0.4"/>
      <circle cx="56" cy="65" r="1.2" fill="#92400e" opacity="0.4"/>
      <circle cx="27" cy="57" r="2.5" fill="#f97316" stroke="#FF6B35" strokeWidth="1"/>
      <rect x="27" y="77" width="46" height="34" rx="11" fill="#292524"/>
      <rect x="33" y="77" width="34" height="34" rx="7" fill="white" opacity="0.94"/>
      <path d="M 38 95 Q 41 90 44 95 Q 47 90 50 95" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 33 77 L 21 68" stroke="#292524" strokeWidth="3" opacity="0.8" strokeLinecap="round"/>
      <path d="M 67 77 L 79 68" stroke="#292524" strokeWidth="3" opacity="0.8" strokeLinecap="round"/>
      <ellipse cx="18" cy="88" rx="12" ry="7.5" fill="#292524" transform="rotate(-26 18 88)"/>
      <ellipse cx="82" cy="88" rx="12" ry="7.5" fill="#292524" transform="rotate(26 82 88)"/>
      <circle cx="11" cy="95" r="8.5" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
      <circle cx="89" cy="95" r="8.5" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
      <line x1="91" y1="80" x2="87" y2="100" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="95" y1="80" x2="91" y2="100" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 87 100 Q 89 104 91 100 Q 93 104 91 100" stroke="#9ca3af" strokeWidth="2" fill="none"/>
      {speaking && <><path d="M 3 85 Q 0 91 3 97" stroke="#f97316" strokeWidth="2.2" fill="none" opacity="0.65" strokeLinecap="round"/><path d="M -1 80 Q -5 91 -1 102" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round"/></>}
    </svg>
  );
}

function Zesty({ mood = "happy", size = 100, speaking = false }) {
  const moods = {
    happy:     { mouth: "M 44 68 Q 50 76 56 68", brow: [[37,44,43,41],[53,41,59,44]], iris: "#2d6a4f", cheek: "#fda4af" },
    excited:   { mouth: "M 42 66 Q 50 78 58 66", brow: [[36,42,43,39],[53,39,60,42]], iris: "#1a4731", cheek: "#f87171" },
    warning:   { mouth: "M 44 70 Q 50 66 56 70", brow: [[37,44,43,46],[53,46,59,44]], iris: "#2d6a4f", cheek: "#fde68a" },
    listening: { mouth: "M 45 68 Q 50 72 55 68", brow: [[37,44,43,42],[53,42,59,44]], iris: "#2d6a4f", cheek: "#86efac" },
  };
  const M = moods[mood] || moods.happy;

  const bodyAnim = speaking
    ? "zesty-talk 0.32s ease-in-out infinite alternate"
    : "zesty-float 3.2s ease-in-out infinite";

  return (
    <svg
      width={size} height={size * 1.35} viewBox="0 0 100 135"
      style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.18))", animation: bodyAnim, display: "block" }}
    >
      <defs>
        <linearGradient id="zv2Hair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1c1917" />
          <stop offset="60%" stopColor="#292524" />
          <stop offset="100%" stopColor="#44403c" />
        </linearGradient>
        <linearGradient id="zv2Skin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="zv2Jacket" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ecfccb" />
          <stop offset="100%" stopColor="#d9f99d" />
        </linearGradient>
        <linearGradient id="zv2Collar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#bef264" />
          <stop offset="100%" stopColor="#a3e635" />
        </linearGradient>
        <radialGradient id="zv2FaceGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fefce8" />
          <stop offset="100%" stopColor="#fef3c7" />
        </radialGradient>
        <filter id="zv2Soft">
          <feGaussianBlur stdDeviation="0.5" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* ── HAIR — sleek asymmetric bob with side swept fringe ── */}
      {/* Back volume */}
      <ellipse cx="50" cy="38" rx="25" ry="28" fill="url(#zv2Hair)"/>
      {/* Left side hair sweep */}
      <path d="M 25 35 Q 18 45 20 60 Q 22 72 26 78" stroke="#1c1917" strokeWidth="8" fill="none" strokeLinecap="round"/>
      {/* Right tuck */}
      <path d="M 72 32 Q 78 42 76 55 Q 74 64 70 70" stroke="#1c1917" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Fringe swept right */}
      <path d="M 28 22 Q 38 14 55 18 Q 65 20 70 26 Q 60 16 48 15 Q 36 14 28 22 Z" fill="#1c1917"/>
      {/* Hair shine */}
      <path d="M 38 16 Q 46 12 56 16" stroke="#57534e" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
      {/* Gold hair pin — Zesty's signature accessory */}
      <circle cx="68" cy="24" r="3.5" fill="#d4a017" stroke="#92400e" strokeWidth="1"/>
      <line x1="65" y1="24" x2="72" y2="24" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="65.5" cy="24" r="1.2" fill="#fbbf24"/>
      <circle cx="72" cy="24" r="1.2" fill="#fbbf24"/>

      {/* ── CHEF HAT — tilted, minimal, cool ── */}
      <g transform="rotate(-8 50 28)">
        <ellipse cx="50" cy="28" rx="20" ry="7" fill="white" stroke="#d1d5db" strokeWidth="1"/>
        <rect x="34" y="12" width="32" height="18" rx="7" fill="white" stroke="#d1d5db" strokeWidth="1"/>
        <ellipse cx="50" cy="12" rx="12" ry="7" fill="white" stroke="#d1d5db" strokeWidth="1"/>
        {/* Lime accent band */}
        <rect x="34" y="26" width="32" height="4" rx="2" fill="url(#zv2Collar)"/>
        {/* Small text on hat: ✦ */}
        <text x="50" y="22" textAnchor="middle" fontSize="7" fill="#84cc16" fontWeight="bold">✦</text>
      </g>

      {/* ── NECK ── */}
      <rect x="44" y="68" width="12" height="10" rx="4" fill="url(#zv2Skin)"/>

      {/* ── FACE ── */}
      <ellipse cx="50" cy="54" rx="21" ry="22" fill="url(#zv2FaceGlow)" stroke="#fbbf24" strokeWidth="1"/>

      {/* Refined eyebrows — arched, tapered */}
      {M.brow.map(([x1,y1,x2,y2],i)=>(
        <path key={i} d={`M ${x1} ${y1} Q ${(x1+x2)/2} ${Math.min(y1,y2)-3} ${x2} ${y2}`}
          stroke="#1c1917" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      ))}

      {/* Eyes — almond-shaped, intelligent */}
      {/* Left eye */}
      <path d="M 37 51 Q 43 47 49 51 Q 43 55 37 51 Z" fill="white" stroke="#1c1917" strokeWidth="0.8"/>
      <circle cx="43" cy="51" r="3.2" fill={M.iris}/>
      <circle cx="43" cy="51" r="1.8" fill="#1c1917"/>
      <circle cx="44.2" cy="49.8" r="0.9" fill="white"/>
      {/* Left upper lash line */}
      <path d="M 37 51 Q 43 47 49 51" stroke="#1c1917" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Left lashes */}
      {[[38,51,37,48],[40,49.5,39,46.5],[43,48,43,45],[46,49,47,46.5],[48.5,50.5,50,48]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1c1917" strokeWidth="1.3" strokeLinecap="round"/>
      ))}

      {/* Right eye */}
      <path d="M 51 51 Q 57 47 63 51 Q 57 55 51 51 Z" fill="white" stroke="#1c1917" strokeWidth="0.8"/>
      <circle cx="57" cy="51" r="3.2" fill={M.iris}/>
      <circle cx="57" cy="51" r="1.8" fill="#1c1917"/>
      <circle cx="58.2" cy="49.8" r="0.9" fill="white"/>
      <path d="M 51 51 Q 57 47 63 51" stroke="#1c1917" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {[[51.5,50.5,50,48],[54,49,53,46.5],[57,48,57,45],[60,49,61,46.5],[62.5,51,64,48]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1c1917" strokeWidth="1.3" strokeLinecap="round"/>
      ))}

      {/* Nose — elegant, minimal */}
      <path d="M 48 58 Q 50 62 52 58" stroke="#d97706" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>

      {/* Subtle cheek flush */}
      <ellipse cx="36" cy="58" rx="5" ry="3.5" fill={M.cheek} opacity="0.35"/>
      <ellipse cx="64" cy="58" rx="5" ry="3.5" fill={M.cheek} opacity="0.35"/>

      {/* Mouth — confident, not overly cute */}
      <path d={M.mouth} stroke="#92400e" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      {mood === "excited" && (
        <path d="M 45 69 Q 50 73 55 69" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9"/>
      )}

      {/* Tiny mole — character detail */}
      <circle cx="58" cy="62" r="1" fill="#92400e" opacity="0.5"/>

      {/* Stud earrings — small lime green gems */}
      <circle cx="29" cy="56" r="2.2" fill="#65a30d" stroke="#4d7c0f" strokeWidth="0.8"/>
      <circle cx="29" cy="56" r="0.8" fill="#d9f99d"/>
      <circle cx="71" cy="56" r="2.2" fill="#65a30d" stroke="#4d7c0f" strokeWidth="0.8"/>
      <circle cx="71" cy="56" r="0.8" fill="#d9f99d"/>

      {/* ── BODY — fitted chef jacket, elegant posture ── */}
      {/* Main jacket */}
      <path d="M 32 78 Q 28 85 26 100 Q 24 115 28 125 Q 35 132 50 132 Q 65 132 72 125 Q 76 115 74 100 Q 72 85 68 78 Q 60 74 50 73 Q 40 74 32 78 Z"
        fill="url(#zv2Jacket)" stroke="#a3e635" strokeWidth="1"/>

      {/* Double-breasted buttons */}
      {[86,96,106].map(y=>(
        <g key={y}>
          <circle cx="45" cy={y} r="2.5" fill="#65a30d" stroke="#4d7c0f" strokeWidth="0.8"/>
          <circle cx="55" cy={y} r="2.5" fill="#65a30d" stroke="#4d7c0f" strokeWidth="0.8"/>
        </g>
      ))}

      {/* Collar */}
      <path d="M 40 78 Q 50 88 60 78 L 58 74 Q 50 82 42 74 Z" fill="url(#zv2Collar)"/>
      <line x1="50" y1="74" x2="50" y2="130" stroke="#a3e635" strokeWidth="0.8" opacity="0.5"/>

      {/* Pocket with zesty sprig */}
      <rect x="34" y="88" width="14" height="10" rx="3" fill="white" opacity="0.5" stroke="#a3e635" strokeWidth="1"/>
      <path d="M 41 92 Q 38 88 38 86" stroke="#4d7c0f" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 41 91 Q 44 87 43 85" stroke="#4d7c0f" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="41" cy="85" r="1.5" fill="#65a30d"/>

      {/* ── LEFT ARM — whisk raised, ready to cook ── */}
      <path d="M 32 80 Q 22 88 18 100" stroke="#a3e635" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <ellipse cx="16" cy="103" rx="8" ry="6" fill="url(#zv2Skin)" stroke="#d97706" strokeWidth="1"/>
      {/* Whisk */}
      <line x1="10" y1="92" x2="16" y2="110" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="15" cy="112" rx="5" ry="7" fill="none" stroke="#65a30d" strokeWidth="1.8"/>
      <line x1="11" y1="107" x2="19" y2="107" stroke="#65a30d" strokeWidth="1.2"/>
      <line x1="10" y1="110" x2="20" y2="110" stroke="#65a30d" strokeWidth="1.2"/>

      {/* ── RIGHT ARM — resting, casual confidence ── */}
      <path d="M 68 80 Q 78 90 80 105" stroke="#a3e635" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <ellipse cx="82" cy="107" rx="8" ry="6" fill="url(#zv2Skin)" stroke="#d97706" strokeWidth="1"/>

      {/* Sound waves when speaking — lime green */}
      {speaking && <>
        <path d="M 4 88 Q 1 96 4 104" stroke="#65a30d" strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round"/>
        <path d="M 0 82 Q -5 96 0 110" stroke="#65a30d" strokeWidth="1.8" fill="none" opacity="0.4" strokeLinecap="round"/>
        <path d="M -4 76 Q -10 96 -4 116" stroke="#65a30d" strokeWidth="1.2" fill="none" opacity="0.2" strokeLinecap="round"/>
      </>}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🍳  FOOD VISUALS — step illustrations + finished dish lookup
// ═══════════════════════════════════════════════════════════════
const STEP_VISUALS = {
  wash:      { emoji:"🫧", label:"Wash hands!", color:"#bfdbfe" },
  blend:     { emoji:"🫙", label:"Blend!", color:"#fef3c7" },
  chop:      { emoji:"🔪", label:"Chop!", color:"#dcfce7" },
  mix:       { emoji:"🥣", label:"Mix it!", color:"#fce7f3" },
  freeze:    { emoji:"🧊", label:"Freeze!", color:"#e0f2fe" },
  pour:      { emoji:"🫗", label:"Pour!", color:"#fef9c3" },
  taste:     { emoji:"👅", label:"Taste!", color:"#fee2e2" },
  heat:      { emoji:"🔥", label:"Heat (Adult!)", color:"#fee2e2" },
  garnish:   { emoji:"🌿", label:"Garnish!", color:"#dcfce7" },
  roll:      { emoji:"🫓", label:"Roll it!", color:"#fef3c7" },
  steam:     { emoji:"♨️", label:"Steam!", color:"#e0f2fe" },
  fry:       { emoji:"🍳", label:"Fry!", color:"#fef3c7" },
  boil:      { emoji:"♨️", label:"Boil!", color:"#fee2e2" },
  knead:     { emoji:"💪", label:"Knead!", color:"#fce7f3" },
  serve:     { emoji:"🍽️", label:"Serve!", color:"#dcfce7" },
  cool:      { emoji:"😮‍💨", label:"Cool down!", color:"#e0f2fe" },
  spread:    { emoji:"🧈", label:"Spread!", color:"#fef9c3" },
  sprinkle:  { emoji:"✨", label:"Sprinkle!", color:"#fae8ff" },
  squeeze:   { emoji:"🍋", label:"Squeeze!", color:"#fef9c3" },
  decorate:  { emoji:"🎨", label:"Decorate!", color:"#fce7f3" },
};

// Map a step's text keywords → visual
function getStepVisual(text="") {
  const t = text.toLowerCase();
  if (t.includes("wash hand"))                      return STEP_VISUALS.wash;
  if (t.includes("blend"))                          return STEP_VISUALS.blend;
  if (t.includes("chop") || t.includes("slice") || t.includes("cut")) return STEP_VISUALS.chop;
  if (t.includes("mix") || t.includes("stir") || t.includes("fold"))  return STEP_VISUALS.mix;
  if (t.includes("freeze") || t.includes("freezer"))return STEP_VISUALS.freeze;
  if (t.includes("pour"))                           return STEP_VISUALS.pour;
  if (t.includes("taste") || t.includes("adjust"))  return STEP_VISUALS.taste;
  if (t.includes("heat") || t.includes("fry") || t.includes("tadka") || t.includes("flame")) return STEP_VISUALS.heat;
  if (t.includes("steam"))                          return STEP_VISUALS.steam;
  if (t.includes("garnish") || t.includes("scatter") || t.includes("coriander")) return STEP_VISUALS.garnish;
  if (t.includes("roll"))                           return STEP_VISUALS.roll;
  if (t.includes("knead"))                          return STEP_VISUALS.knead;
  if (t.includes("cool") || t.includes("refrigerat")) return STEP_VISUALS.cool;
  if (t.includes("spread"))                         return STEP_VISUALS.spread;
  if (t.includes("sprinkle") || t.includes("decoration")) return STEP_VISUALS.sprinkle;
  if (t.includes("squeeze") || t.includes("lemon")) return STEP_VISUALS.squeeze;
  if (t.includes("decorate") || t.includes("candle")) return STEP_VISUALS.decorate;
  if (t.includes("serve") || t.includes("plate"))   return STEP_VISUALS.serve;
  if (t.includes("boil"))                           return STEP_VISUALS.boil;
  return null;
}

// Finished dish visuals — emoji art for completed recipes
const DISH_ART = {
  1:  { art:"🥭🧊✨", caption:"Golden mango popsicles — frozen perfection!" },
  2:  { art:"🥭🍊🍎🌿", caption:"Colourful fruit chaat — tangy and fresh!" },
  3:  { art:"🥛🥭💛", caption:"Thick, creamy Mango Lassi!" },
  4:  { art:"🍌🥛🌀", caption:"Thick and creamy banana smoothie!" },
  5:  { art:"🥬🍅🥪✨", caption:"Rainbow veggie sandwich — layers of yum!" },
  6:  { art:"🥥⚪🍬", caption:"Snow-white coconut ladoos!" },
  7:  { art:"🍋💚🫙", caption:"Refreshing nimbu paani!" },
  8:  { art:"🍚🥛🌿", caption:"Cool, creamy curd rice — comfort in a bowl!" },
  9:  { art:"🍓🥛💗", caption:"Beautiful pink strawberry milkshake!" },
  10: { art:"🍞🥜🍌🍯", caption:"Golden peanut butter toast!" },
  11: { art:"🥒🥛✨", caption:"Cool and creamy cucumber raita!" },
  12: { art:"🍉🔴💧", caption:"Fresh watermelon juice — pure summer!" },
  13: { art:"🌾🟤🍯", caption:"Golden atta ladoos!" },
  14: { art:"🔴🟠🟢🧊", caption:"Rainbow fruit popsicles — three layers!" },
  15: { art:"🍌🍫🥣", caption:"Gorgeous chocolate banana bowl!" },
  30: { art:"🌟🍽️💛", caption:"Fluffy golden Poha — Maharashtra magic!" },
  31: { art:"🥣🌿✨", caption:"Fluffy, nutritious Upma!" },
  32: { art:"🍜🥚🌶️", caption:"Upgraded Maggi — chef-level noodles!" },
  33: { art:"🟡✨🍮", caption:"Golden, fragrant Suji Halwa!" },
  34: { art:"🥥💚🌿", caption:"Creamy coconut chutney!" },
  35: { art:"⚪⚪⚪✨", caption:"Soft, fluffy steamed idlis!" },
  36: { art:"🟡🌿✨", caption:"Spongy, tangy Dhokla!" },
  37: { art:"🟢🫓✨", caption:"Thin, soft Methi Thepla!" },
  38: { art:"🥞🍌🍯", caption:"Fluffy banana pancake stack!" },
  39: { art:"🍲💛🌿", caption:"Comforting vegetable khichdi!" },
  40: { art:"🌟🍽️🥜", caption:"Kanda Poha — Maharashtra morning!" },
  41: { art:"🍳🥚🌶️", caption:"Spiced fluffy egg bhurji!" },
  42: { art:"🍚✨🌿", caption:"Fragrant, golden jeera rice!" },
  43: { art:"🟠🍲🌿", caption:"Thick, protein-rich masoor dal!" },
  44: { art:"🥔🌶️✨", caption:"Spiced aloo sabzi — golden potatoes!" },
  45: { art:"🍝🍅✨", caption:"One-pot pasta — minimal dishes, max taste!" },
  50: { art:"🫓🥔✨", caption:"Crispy, stuffed Aloo Paratha — Punjab pride!" },
  51: { art:"🟡🍲✨", caption:"Golden Dal Tadka — comfort in a bowl!" },
  52: { art:"🌯🥥✨", caption:"Paper-thin, crispy golden Dosa!" },
  53: { art:"🟤🌿🥣", caption:"Tangy, fragrant Sambar!" },
  54: { art:"🟡🍮✨", caption:"Sweet, tangy Gujarati Kadhi!" },
  55: { art:"🍲🌶️🥖", caption:"Spicy Misal Pav — Pune street food!" },
  56: { art:"🧀🌶️✨", caption:"Spiced, crumbled Paneer Bhurji!" },
  70: { art:"🫘🍲✨", caption:"Hearty Rajma — batch cook champion!" },
  71: { art:"🟢🍲💚", caption:"Iron-rich Palak Dal!" },
  72: { art:"🍅🍲♨️", caption:"Homemade tomato soup — pure comfort!" },
  73: { art:"🍗🍚✨", caption:"Glazed chicken rice bowl!" },
  80: { art:"🎂🖤💗", caption:"No-bake Oreo birthday cake — stunning!" },
  81: { art:"🍫✨💜", caption:"Airy, velvety chocolate mousse!" },
  82: { art:"🌽🔴🍋", caption:"BBQ masala corn — street food magic!" },
  83: { art:"🍮💛🥛", caption:"Creamy, fragrant Mum's Kheer!" },
  84: { art:"🥛💛✨", caption:"Elegant saffron Rasmalai!" },
  85: { art:"🎄⚪🟢", caption:"Festive Christmas cake balls!" },
  86: { art:"🌀🟡✨", caption:"Crispy spiralled Diwali Chakli!" },
};

// ═══════════════════════════════════════════════════════════════
// 🎬  CHEF ACTION ANIMATIONS — shows chef "doing" each step
// ═══════════════════════════════════════════════════════════════

function getChefAction(text="", chefColor="#f97316") {
  const t = text.toLowerCase();
  const c = chefColor;

  if (t.includes("wash hand")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <rect x="30" y="45" width="60" height="28" rx="8" fill="#bfdbfe"/>
      <path d="M 30 53 Q 60 48 90 53" fill="#93c5fd" opacity="0.5"/>
      <ellipse cx="52" cy="52" rx="12" ry="8" fill="#fef3c7" transform="rotate(-15 52 52)"/>
      <ellipse cx="72" cy="52" rx="12" ry="8" fill="#fef3c7" transform="rotate(15 72 52)"/>
      <rect x="54" y="20" width="12" height="22" rx="4" fill="#9ca3af"/>
      <rect x="46" y="16" width="28" height="7" rx="3" fill="#6b7280"/>
      <ellipse cx="60" cy="40" rx="2" ry="4" fill="#93c5fd"/>
      <ellipse cx="55" cy="43" rx="1.5" ry="3" fill="#93c5fd" opacity="0.7"/>
      <ellipse cx="65" cy="43" rx="1.5" ry="3" fill="#93c5fd" opacity="0.7"/>
      <circle cx="48" cy="55" r="3" fill="white" opacity="0.8"/>
      <circle cx="60" cy="50" r="4" fill="white" opacity="0.6"/>
      <circle cx="72" cy="55" r="3" fill="white" opacity="0.8"/>
      <text x="60" y="76" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Wash hands! 🫧</text>
    </svg>
  );

  if (t.includes("blend")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <path d="M 38 18 L 34 58 Q 34 64 40 64 L 80 64 Q 86 64 86 58 L 82 18 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5"/>
      <path d="M 38 18 L 82 18" stroke="#9ca3af" strokeWidth="2"/>
      <path d="M 44 42 Q 50 30 60 35 Q 70 40 76 30" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M 46 50 Q 60 38 74 46" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <rect x="36" y="12" width="48" height="10" rx="4" fill="#9ca3af"/>
      <rect x="50" y="6" width="20" height="10" rx="3" fill="#6b7280"/>
      <rect x="32" y="60" width="56" height="14" rx="6" fill="#374151"/>
      <circle cx="60" cy="40" r="3" fill={c}/>
      <circle cx="52" cy="34" r="2" fill={c} opacity="0.6"/>
      <circle cx="68" cy="46" r="2" fill={c} opacity="0.6"/>
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Blend it! 🫙</text>
    </svg>
  );

  if (t.includes("chop") || t.includes("slice") || (t.includes("cut") && !t.includes("cucumber"))) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <rect x="15" y="40" width="90" height="28" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <ellipse cx="55" cy="50" rx="22" ry="12" fill="#4ade80"/>
      <line x1="45" y1="40" x2="45" y2="62" stroke="white" strokeWidth="1.5" opacity="0.8"/>
      <line x1="55" y1="40" x2="55" y2="62" stroke="white" strokeWidth="1.5" opacity="0.8"/>
      <line x1="65" y1="40" x2="65" y2="62" stroke="white" strokeWidth="1.5" opacity="0.8"/>
      <path d="M 72 15 L 85 28 L 78 32 L 65 18 Z" fill="#9ca3af"/>
      <rect x="72" y="10" width="8" height="10" rx="2" fill="#6b7280"/>
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Chop! 🔪</text>
    </svg>
  );

  if (t.includes("mix") || t.includes("stir") || t.includes("whisk") || t.includes("fold")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <path d="M 25 38 Q 25 68 60 68 Q 95 68 95 38 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <ellipse cx="60" cy="38" rx="35" ry="10" fill="#fef9c3" stroke="#d97706" strokeWidth="2"/>
      <path d="M 40 48 Q 50 38 60 45 Q 70 52 80 42" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M 38 55 Q 55 44 72 52" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <line x1="60" y1="10" x2="60" y2="45" stroke="#6b7280" strokeWidth="2.5"/>
      <ellipse cx="60" cy="46" rx="8" ry="10" fill="none" stroke="#65a30d" strokeWidth="2"/>
      <line x1="54" y1="40" x2="66" y2="40" stroke="#65a30d" strokeWidth="1.5"/>
      <line x1="54" y1="44" x2="66" y2="44" stroke="#65a30d" strokeWidth="1.5"/>
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Mix! 🥣</text>
    </svg>
  );

  if (t.includes("freeze") || t.includes("refrigerat") || t.includes("chill")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <rect x="25" y="8" width="70" height="62" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2"/>
      <line x1="25" y1="38" x2="95" y2="38" stroke="#0284c7" strokeWidth="1.5"/>
      <rect x="86" y="15" width="5" height="18" rx="2.5" fill="#0284c7"/>
      <rect x="86" y="44" width="5" height="12" rx="2.5" fill="#0284c7"/>
      {[[50,20],[70,22],[45,30],[65,28],[55,50],[75,52]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="#93c5fd" strokeWidth="1.5"/>
          <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="#93c5fd" strokeWidth="1.5"/>
        </g>
      ))}
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7">Freeze! 🧊</text>
    </svg>
  );

  if (t.includes("pour") || t.includes("transfer")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <path d="M 15 12 L 15 52 Q 15 58 22 58 L 50 58 Q 57 58 57 52 L 57 12 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <path d="M 57 22 Q 68 19 66 29 Q 64 35 57 35" fill="none" stroke="#d97706" strokeWidth="1.5"/>
      <rect x="12" y="8" width="46" height="7" rx="3" fill="#d97706" opacity="0.4"/>
      <path d="M 57 28 Q 70 32 73 42 Q 75 50 71 52" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M 62 48 Q 62 62 80 62 Q 98 62 98 48 Z" fill="#fef9c3" stroke="#d97706" strokeWidth="1.5"/>
      <ellipse cx="80" cy="48" rx="18" ry="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <path d="M 64 53 Q 80 47 96 53" stroke={c} strokeWidth="2" fill="none" opacity="0.6"/>
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Pour in! 🫗</text>
    </svg>
  );

  if (t.includes("taste") || t.includes("adjust")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <ellipse cx="55" cy="32" rx="14" ry="10" fill={c} opacity="0.3" stroke={c} strokeWidth="1.5"/>
      <path d="M 55 42 L 55 65" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="55" cy="32" rx="10" ry="7" fill={c} opacity="0.5"/>
      <path d="M 48 20 Q 44 12 48 6" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M 55 18 Q 51 10 55 4" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M 62 20 Q 58 12 62 6" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
      <circle cx="88" cy="35" r="18" fill="#fef9c3" stroke="#d97706" strokeWidth="1.5"/>
      <path d="M 81 37 Q 88 44 95 37" stroke="#d97706" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="83" cy="30" r="2.5" fill="#1c1917"/>
      <circle cx="93" cy="30" r="2.5" fill="#1c1917"/>
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Taste! 😋</text>
    </svg>
  );

  if (t.includes("heat") || t.includes("tadka") || t.includes("fry") || t.includes("sizzle") || t.includes("flame") || t.includes("grown-up") || t.includes("oil")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <rect x="15" y="52" width="90" height="20" rx="6" fill="#374151"/>
      <circle cx="40" cy="50" r="15" fill="#1f2937"/>
      <circle cx="40" cy="50" r="10" fill="#111827"/>
      <circle cx="80" cy="50" r="15" fill="#1f2937"/>
      <circle cx="80" cy="50" r="10" fill="#111827"/>
      <path d="M 35 48 Q 38 38 40 42 Q 42 36 45 48" fill="#f97316"/>
      <path d="M 37 48 Q 40 40 43 48" fill="#fbbf24" opacity="0.8"/>
      <path d="M 75 48 Q 78 38 80 42 Q 82 36 85 48" fill="#f97316"/>
      <path d="M 77 48 Q 80 40 83 48" fill="#fbbf24" opacity="0.8"/>
      <ellipse cx="80" cy="44" rx="22" ry="7" fill="#6b7280" stroke="#4b5563" strokeWidth="1.5"/>
      <ellipse cx="80" cy="42" rx="20" ry="6" fill="#374151"/>
      <circle cx="74" cy="40" r="2.5" fill={c}/>
      <circle cx="82" cy="38" r="2" fill={c} opacity="0.8"/>
      <circle cx="88" cy="41" r="2.5" fill={c} opacity="0.7"/>
      <rect x="100" y="40" width="16" height="5" rx="2.5" fill="#6b7280"/>
      <text x="30" y="32" fontSize="14">⚠️</text>
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">Adult Step! 🔥</text>
    </svg>
  );

  if (t.includes("steam") || t.includes("boil")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <path d="M 25 38 L 28 65 Q 28 70 35 70 L 85 70 Q 92 70 92 65 L 95 38 Z" fill="#d1d5db" stroke="#6b7280" strokeWidth="2"/>
      <ellipse cx="60" cy="38" rx="35" ry="10" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2"/>
      <path d="M 25 48 Q 12 48 12 56 Q 12 62 25 60" fill="none" stroke="#6b7280" strokeWidth="3"/>
      <path d="M 95 48 Q 108 48 108 56 Q 108 62 95 60" fill="none" stroke="#6b7280" strokeWidth="3"/>
      <ellipse cx="60" cy="36" rx="36" ry="11" fill="#9ca3af" stroke="#6b7280" strokeWidth="1.5"/>
      <ellipse cx="60" cy="32" rx="8" ry="5" fill="#6b7280"/>
      {[[44,18],[54,14],[64,18],[74,14]].map(([x,y],i)=>(
        <path key={i} d={`M ${x} 34 Q ${x-4} ${(y+34)/2} ${x} ${y}`} stroke="#93c5fd" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      ))}
      <text x="60" y="79" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Steam! ♨️</text>
    </svg>
  );

  if (t.includes("roll") || t.includes("knead")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <rect x="10" y="52" width="100" height="16" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <ellipse cx="60" cy="52" rx="40" ry="8" fill="#fef9c3" stroke="#d97706" strokeWidth="1.5"/>
      <rect x="12" y="34" width="96" height="16" rx="8" fill="#d97706"/>
      <rect x="8" y="36" width="14" height="12" rx="6" fill="#92400e"/>
      <rect x="98" y="36" width="14" height="12" rx="6" fill="#92400e"/>
      <circle cx="35" cy="48" r="5" fill="white" opacity="0.6"/>
      <circle cx="60" cy="44" r="4" fill="white" opacity="0.5"/>
      <circle cx="85" cy="48" r="5" fill="white" opacity="0.6"/>
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Roll! 🫓</text>
    </svg>
  );

  if (t.includes("serve") || t.includes("plate")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <circle cx="60" cy="44" r="28" fill="white" stroke="#d1d5db" strokeWidth="2"/>
      <circle cx="60" cy="44" r="22" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
      <ellipse cx="60" cy="44" rx="18" ry="12" fill={c} opacity="0.3"/>
      <circle cx="52" cy="40" r="5" fill={c} opacity="0.7"/>
      <circle cx="65" cy="38" r="4" fill="#4ade80" opacity="0.8"/>
      <circle cx="58" cy="48" r="4" fill="#fbbf24" opacity="0.8"/>
      <line x1="20" y1="26" x2="20" y2="64" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round"/>
      <text x="60" y="79" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Serve! 🍽️</text>
    </svg>
  );

  if (t.includes("squeeze") || (t.includes("lemon") && !t.includes("drop"))) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <circle cx="38" cy="35" r="22" fill="#fde047" stroke="#ca8a04" strokeWidth="2"/>
      <circle cx="38" cy="35" r="18" fill="#fef08a"/>
      {[0,60,120,180,240,300].map((deg,i)=>{ const r2=deg*Math.PI/180; return <line key={i} x1="38" y1="35" x2={38+18*Math.cos(r2)} y2={35+18*Math.sin(r2)} stroke="#ca8a04" strokeWidth="1" opacity="0.5"/>; })}
      <path d="M 72 18 L 68 62 Q 68 68 74 68 L 108 68 Q 114 68 114 62 L 110 18 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <path d="M 72 50 L 70 64 Q 70 66 75 66 L 107 66" fill="#fde047" opacity="0.5"/>
      <path d="M 56 30 Q 66 28 70 35" stroke="#fde047" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="60" cy="32" r="2" fill="#fde047"/>
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ca8a04">Squeeze! 🍋</text>
    </svg>
  );

  if (t.includes("spread") || t.includes("butter") || t.includes("chutney")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <rect x="12" y="28" width="80" height="40" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <rect x="17" y="32" width="70" height="32" rx="6" fill="#fde68a"/>
      <path d="M 22 44 Q 55 37 88 42" stroke={c} strokeWidth="5" strokeLinecap="round" opacity="0.7"/>
      <path d="M 22 52 Q 55 48 88 50" stroke={c} strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
      <path d="M 90 22 L 107 30 L 102 36 L 85 28 Z" fill="#9ca3af"/>
      <rect x="90" y="16" width="8" height="10" rx="2" fill="#6b7280"/>
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Spread! 🧈</text>
    </svg>
  );

  if (t.includes("decorate") || t.includes("sprinkle") || t.includes("candle")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <rect x="20" y="44" width="80" height="26" rx="8" fill="#f9a8d4"/>
      <rect x="20" y="36" width="80" height="14" rx="4" fill="#fce7f3"/>
      <rect x="20" y="44" width="80" height="6" fill="#f472b6"/>
      <rect x="40" y="24" width="6" height="16" rx="2" fill="#fde047"/>
      <rect x="57" y="20" width="6" height="20" rx="2" fill="#93c5fd"/>
      <rect x="74" y="24" width="6" height="16" rx="2" fill="#fca5a5"/>
      <path d="M 43 22 Q 43 14 45 18" fill="#f97316"/>
      <path d="M 60 18 Q 60 10 62 14" fill="#f97316"/>
      <path d="M 77 22 Q 77 14 79 18" fill="#f97316"/>
      {[[30,42],[50,39],[70,40],[90,42]].map(([x,y],i)=>(
        <rect key={i} x={x-2} y={y-1} width="5" height="3" rx="1.5" fill={["#f97316","#65a30d","#3b82f6","#ec4899"][i%4]}/>
      ))}
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ec4899">Decorate! 🎨</text>
    </svg>
  );

  if (t.includes("cool") || t.includes("rest") || t.includes("wait") || t.includes("minute")) return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <circle cx="60" cy="38" r="28" fill="white" stroke="#d1d5db" strokeWidth="2"/>
      <circle cx="60" cy="38" r="24" fill="#f8fafc"/>
      <line x1="60" y1="38" x2="60" y2="18" stroke="#374151" strokeWidth="3" strokeLinecap="round"/>
      <line x1="60" y1="38" x2="76" y2="44" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i)=>{const r2=deg*Math.PI/180;const r3=24;return <line key={i} x1={60+r3*Math.cos(r2)} y1={38+r3*Math.sin(r2)} x2={60+(r3-5)*Math.cos(r2)} y2={38+(r3-5)*Math.sin(r2)} stroke="#9ca3af" strokeWidth="1.5"/>;}) }
      <path d="M 40 68 Q 44 60 48 65" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 54 70 Q 58 62 62 67" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 68 68 Q 72 60 76 65" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <text x="60" y="79" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Wait & cool! ⏱️</text>
    </svg>
  );

  // Default: chef with bowl
  return (
    <svg viewBox="0 0 120 80" width="120" height="80">
      <path d="M 25 36 Q 25 66 60 66 Q 95 66 95 36 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <ellipse cx="60" cy="36" rx="35" ry="10" fill="#fef9c3" stroke="#d97706" strokeWidth="2"/>
      <path d="M 42 22 Q 38 14 42 8" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M 60 20 Q 56 12 60 6" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M 78 22 Q 74 14 78 8" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
      <circle cx="48" cy="50" r="5" fill={c} opacity="0.7"/>
      <circle cx="62" cy="46" r="6" fill="#4ade80" opacity="0.7"/>
      <circle cx="74" cy="51" r="5" fill="#fbbf24" opacity="0.7"/>
      <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={c}>Let's cook! 👨‍🍳</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🤖  CLAUDE AI HELPER
//     API key is read from environment variable VITE_ANTHROPIC_API_KEY
//     Set this in your .env file (see .env.example)
//     ⚠️  Never commit your actual API key to git
// ═══════════════════════════════════════════════════════════════
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || "";

async function askClaude(system, user, maxTokens=400) {
  if (!ANTHROPIC_API_KEY) {
    // Graceful fallback when no API key is set
    return "";
  }
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:maxTokens,
        system, messages:[{role:"user",content:user}]}),
    });
    if (!r.ok) return "";
    const d = await r.json();
    return d.content?.[0]?.text || "";
  } catch { return ""; }
}

// ─── Shared Modal ─────────────────────────────────────────────
function Modal({open,onClose,title,children}){
  if(!open) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:"28px 28px 0 0",padding:"22px 18px 36px",width:"100%",maxWidth:480,maxHeight:"88vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontWeight:900,fontSize:16,color:"#1c1917"}}>{title}</div>
          <button onClick={onClose} style={{background:"#f5f5f4",border:"none",borderRadius:10,width:32,height:32,cursor:"pointer",fontSize:16,fontWeight:700}}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AIBox({text,loading}){
  if(loading) return <div style={{display:"flex",alignItems:"center",gap:10,padding:"13px 15px",background:"#fff7ed",borderRadius:14,border:"1.5px solid #fed7aa"}}><div style={{width:18,height:18,border:"3px solid #f97316",borderTopColor:"transparent",borderRadius:"50%",animation:"sizzle-float 0.7s linear infinite"}}/><span style={{fontSize:13,color:"#9a3412",fontWeight:700}}>Sizzle is thinking…</span></div>;
  if(!text) return null;
  return <div style={{padding:"13px 15px",background:"linear-gradient(135deg,#fff7ed,#fef3c7)",borderRadius:14,border:"1.5px solid #fed7aa",fontSize:13,lineHeight:1.75,color:"#1c1917",fontWeight:600,whiteSpace:"pre-wrap"}}>{text}</div>;
}

// ── BADGE DATA ────────────────────────────────────────────────
const BADGES = [
  {id:"first_cook",    icon:"👨‍🍳", name:"First Cook",     desc:"Completed your very first recipe!",        pts:10},
  {id:"clean_chef",    icon:"🫧",   name:"Clean Chef",      desc:"Always washed hands before cooking!",      pts:10},
  {id:"spice_hero",    icon:"🌶️", name:"Spice Hero",       desc:"Used cardamom like a pro!",                pts:15},
  {id:"rescue_expert", icon:"🛟",   name:"Rescue Expert",  desc:"Fixed a cooking mistake with Oops!",       pts:25},
  {id:"fridge_wizard", icon:"🧊",   name:"Fridge Wizard",  desc:"Cooked from fridge ingredients!",          pts:30},
  {id:"memory_maker",  icon:"📸",   name:"Memory Maker",   desc:"Saved a dish to Memory Book!",             pts:20},
  {id:"speed_chef",    icon:"⚡",   name:"Speed Chef",      desc:"Cooked a 30-min weeknight meal!",          pts:25},
  {id:"quest_hero",    icon:"⚔️",  name:"Quest Hero",       desc:"Completed a Cooking Quest!",               pts:35},
  {id:"cheerleader",   icon:"📣",   name:"Cheerleader",    desc:"Cooked with Cheerleader Mode on!",         pts:15},
  {id:"lassi_legend",  icon:"🥭",   name:"Lassi Legend",   desc:"Made the perfect Mango Lassi!",            pts:20},
];
const PARENT_TITLES = [
  {min:0,  label:"Kitchen Observer 👀",     color:"#9ca3af"},
  {min:20, label:"Sous-Chef Parent 🍴",     color:"#60a5fa"},
  {min:60, label:"Family Chef Partner 👨‍👩‍👧",color:"#34d399"},
  {min:120,label:"Best Chef Dad/Mom 🏆",    color:"#f59e0b"},
  {min:200,label:"Master Kitchen Family 🌟",color:"#f97316"},
];
const QUICK_RECIPES = [
  {id:"q1",name:"Egg Bhurji + Toast",  time:12,emoji:"🍳",level:"Easy",  diet:"non-veg",tags:["breakfast"],desc:"Spiced Mumbai scrambled eggs — 12 mins!"},
  {id:"q2",name:"Jeera Rice + Dal",    time:25,emoji:"🍚",level:"Easy",  diet:"veg",    tags:["dinner"],  desc:"One-pot comfort — the weeknight warrior."},
  {id:"q3",name:"Paneer Bhurji Roti",  time:20,emoji:"🧀",level:"Easy",  diet:"veg",    tags:["dinner"],  desc:"Crumbled spiced paneer + roti. Done fast!"},
  {id:"q4",name:"Maggi Upgrade",       time:8, emoji:"🍜",level:"Easy",  diet:"veg",    tags:["snack"],   desc:"Maggi + egg + veggies. 8-minute favourite."},
  {id:"q5",name:"Chicken Fried Rice",  time:22,emoji:"🍗",level:"Medium",diet:"non-veg",tags:["dinner"],  desc:"Leftover rice hero — under 25 minutes!"},
  {id:"q6",name:"Aloo Paratha",        time:28,emoji:"🫓",level:"Medium",diet:"veg",    tags:["breakfast"],desc:"Crispy stuffed parathas in 28 minutes."},
  {id:"q7",name:"Tomato Soup",         time:18,emoji:"🍅",level:"Easy",  diet:"veg",    tags:["lunch"],   desc:"Blended homemade tomato soup — pure comfort."},
  {id:"q8",name:"Masoor Dal Rice",     time:20,emoji:"🟠",level:"Easy",  diet:"veg",    tags:["dinner"],  desc:"Red lentil dal + rice — 20-min protein."},
];
const CHEERS = [
  "🔥 You are ABSOLUTELY ON FIRE right now! Those skills are incredible!",
  "💪 That is EXACTLY how a real chef does it — brilliant technique!",
  "⭐ Can we get a round of applause?! That step was PERFECT!",
  "🌟 You are going to absolutely NAIL this dish! I can feel it!",
  "🎉 YAS CHEF! That move was textbook perfect! Keep going!",
  "🚀 You are cooking like you have done this for YEARS. Amazing!",
  "💛 This is going to taste SO good — I am already excited to try it!",
  "👏 Every single step done perfectly. You should be SO proud!",
];

// ─── Feature 1: What Does This Mean? ─────────────────────────
function WhatMeansBtn({stepText, accent}){
  const [open,setOpen]=useState(false);
  const [ans,setAns]=useState(""); const [load,setLoad]=useState(false);
  const ask=async()=>{
    setOpen(true); if(ans) return;
    setLoad(true);
    const r=await askClaude(
      "You are Sizzle, a fun chef teaching kids aged 7-16. Explain this cooking step very simply with a fun analogy kids understand. Max 60 words. Be enthusiastic!",
      `Explain this cooking step simply for a child: "${stepText}"`
    );
    setAns(r||"This just means doing exactly what the step says — carefully and slowly! You've absolutely got this! 🔥");
    setLoad(false);
  };
  return(<>
    <button onClick={ask} style={{background:"#eff6ff",color:"#1e40af",border:"1.5px solid #93c5fd",borderRadius:11,padding:"8px 13px",fontSize:12,fontWeight:800,cursor:"pointer",width:"100%"}}>
      🤔 What does this mean?
    </button>
    <Modal open={open} onClose={()=>setOpen(false)} title="🤔 Sizzle Explains!">
      <div style={{background:"#f0f9ff",borderRadius:12,padding:"10px 13px",marginBottom:13,fontSize:12,color:"#0369a1",fontWeight:700,lineHeight:1.6}}>"{stepText}"</div>
      <AIBox text={ans} loading={load}/>
    </Modal>
  </>);
}

// ─── Feature 6: Oops! Button ─────────────────────────────────
function OopsBtn({recipeName, stepText}){
  const [open,setOpen]=useState(false);
  const [issue,setIssue]=useState(""); const [fix,setFix]=useState(""); const [load,setLoad]=useState(false);
  const getFix=async()=>{
    setLoad(true); setFix("");
    const r=await askClaude(
      "You are Sizzle, an encouraging chef. A cooking step went wrong. Give 2-3 numbered rescue steps. Be specific and positive. Max 80 words.",
      `Recipe: ${recipeName}\nStep: ${stepText}\nProblem: ${issue||"something went wrong"}\nHow to rescue it?`
    );
    setFix(r||"Don't panic! Taste it first — sometimes it is better than you think! If too salty, add more unsalted ingredients. If too thick, add liquid slowly. Every great chef has disasters. You've got this! 🛟");
    setLoad(false);
  };
  return(<>
    <button onClick={()=>{setOpen(true);setFix("");setIssue("");}}
      style={{background:"#fef2f2",color:"#dc2626",border:"1.5px solid #fca5a5",borderRadius:11,padding:"8px 13px",fontSize:12,fontWeight:800,cursor:"pointer",width:"100%"}}>
      😬 Oops! Something went wrong
    </button>
    <Modal open={open} onClose={()=>setOpen(false)} title="🛟 Recipe Rescue!">
      <p style={{fontSize:13,color:"#6b7280",marginBottom:10,fontWeight:600}}>Tell Sizzle what went wrong — he'll rescue it! Every chef has kitchen disasters. 🔥</p>
      <textarea value={issue} onChange={e=>setIssue(e.target.value)}
        placeholder="e.g. it's too thick, burnt on one side, too salty, not blending properly…"
        style={{width:"100%",padding:"11px 13px",borderRadius:13,border:"2px solid #fee2e2",fontSize:13,fontFamily:"inherit",resize:"none",height:80,outline:"none",color:"#1c1917",fontWeight:600,marginBottom:10}}/>
      <button onClick={getFix} disabled={load}
        style={{...BTN,background:"linear-gradient(135deg,#dc2626,#f97316)",marginBottom:13}}>
        {load?"Finding rescue plan…":"🛟 Save My Dish!"}
      </button>
      <AIBox text={fix} loading={load}/>
    </Modal>
  </>);
}

// ─── Feature 8: Cheerleader Mode ─────────────────────────────
function CheerBtn({enabled, onToggle, accent}){
  const synth=useRef(typeof window!=="undefined"&&window.speechSynthesis?window.speechSynthesis:null);
  const cheer=()=>{
    if(!synth.current) return;
    const msg=CHEERS[Math.floor(Math.random()*CHEERS.length)];
    synth.current.cancel();
    const u=new SpeechSynthesisUtterance(msg);
    const vs=synth.current.getVoices?.()??[];
    const v=vs.find(x=>x.lang==="en-IN")||vs.find(x=>x.lang.startsWith("en"));
    if(v)u.voice=v; u.rate=1.05; u.pitch=1.25;
    synth.current.speak(u);
  };
  return(
    <div style={{background:enabled?"linear-gradient(135deg,#fff7ed,#fef3c7)":"#f9fafb",border:`2px solid ${enabled?"#fbbf24":"#e5e7eb"}`,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,transition:"all 0.3s"}}>
      <span style={{fontSize:20}}>{enabled?"📣":"🔇"}</span>
      <div style={{flex:1}}>
        <div style={{fontWeight:800,fontSize:13,color:enabled?"#92400e":"#6b7280"}}>Cheerleader Mode</div>
        <div style={{fontSize:11,color:enabled?"#9a3412":"#9ca3af",fontWeight:600}}>{enabled?"Sizzle is cheering you on! 🔥":"Tap to turn on encouragement"}</div>
      </div>
      {enabled&&<button onClick={cheer} style={{background:"#fbbf24",border:"none",borderRadius:10,padding:"6px 10px",fontSize:12,fontWeight:800,cursor:"pointer",color:"#92400e",flexShrink:0}}>📣 Cheer!</button>}
      <div onClick={onToggle} style={{width:44,height:24,background:enabled?accent:"#d1d5db",borderRadius:99,position:"relative",cursor:"pointer",transition:"background 0.3s",flexShrink:0}}>
        <div style={{position:"absolute",top:3,left:enabled?22:3,width:18,height:18,background:"white",borderRadius:"50%",transition:"left 0.3s",boxShadow:"0 2px 4px rgba(0,0,0,0.2)"}}/>
      </div>
    </div>
  );
}

// ─── Feature 5: Fridge-to-Recipe ─────────────────────────────
function FridgeScreen(){
  const [ings,setIngs]=useState(""); const [recipe,setRecipe]=useState(""); const [load,setLoad]=useState(false);
  const fileRef=useRef();
  const go=async()=>{
    if(!ings.trim()) return;
    setLoad(true); setRecipe("");
    const r=await askClaude(
      "You are Sizzle, creative family chef. Given fridge ingredients suggest ONE delicious family recipe. Format: Recipe name + time + serves, then numbered steps (max 6). Simple enough for a kid aged 10+ with adult help. Enthusiastic! Max 180 words.",
      `My fridge has: ${ings}\nWhat family recipe can I make tonight?`,400
    );
    setRecipe(r||"Try a simple stir-fry! Heat oil, add veggies, add egg or protein, season with salt and any spice. Done in 15 minutes! 🔥");
    setLoad(false);
  };
  return(
    <div style={{padding:16,paddingBottom:90}}>
      <div style={{fontWeight:900,fontSize:18,color:"#1c1917",marginBottom:4}}>🧊 Fridge-to-Recipe</div>
      <div style={{fontSize:13,color:"#6b7280",marginBottom:16,fontWeight:600,lineHeight:1.6}}>Tell Sizzle what's in your fridge — he'll create a perfect family recipe! ✨</div>
      <div onClick={()=>fileRef.current?.click()} style={{background:"#ecfdf5",border:"2px dashed #34d399",borderRadius:16,padding:18,textAlign:"center",marginBottom:14,cursor:"pointer"}}>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)setIngs(p=>p?p+", (photo added)":"Photo added — list ingredients:");}}/>
        <div style={{fontSize:34,marginBottom:4}}>📸</div>
        <div style={{fontWeight:800,color:"#059669",fontSize:13}}>Snap your fridge!</div>
        <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>or type ingredients below</div>
      </div>
      <textarea value={ings} onChange={e=>setIngs(e.target.value)}
        placeholder="e.g. 2 eggs, leftover rice, half onion, tomatoes, paneer, spinach, milk, butter…"
        style={{width:"100%",padding:"12px 14px",borderRadius:14,border:"2px solid #d1fae5",fontSize:13,fontFamily:"inherit",resize:"none",height:90,outline:"none",color:"#1c1917",fontWeight:600,marginBottom:10,boxSizing:"border-box"}}/>
      <button onClick={go} disabled={!ings.trim()||load}
        style={{...BTN,background:"linear-gradient(135deg,#059669,#10b981)",marginBottom:14,opacity:!ings.trim()?0.5:1}}>
        {load?"Sizzle is cooking up ideas…":"🧪 Create My Recipe!"}
      </button>
      <AIBox text={recipe} loading={load}/>
    </div>
  );
}

// ─── Feature 7: Memory Book ───────────────────────────────────
const MEM_KEY="sz_memories_v1";
function MemoryBook(){
  const [mems,setMems]=useState(()=>{try{return JSON.parse(localStorage.getItem(MEM_KEY)||"[]")}catch{return []}});
  const [adding,setAdding]=useState(false);
  const [dish,setDish]=useState(""); const [note,setNote]=useState(""); const [img,setImg]=useState(null);
  const [printing,setPrint]=useState(null);
  const fileRef=useRef();
  const save=(u)=>{setMems(u);try{localStorage.setItem(MEM_KEY,JSON.stringify(u))}catch{}};
  const addMem=()=>{
    if(!dish.trim())return;
    save([{id:Date.now(),dish,note,img,date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}, ...mems]);
    setAdding(false); setDish(""); setNote(""); setImg(null);
  };
  return(
    <div style={{padding:16,paddingBottom:90}}>
      <div style={{fontWeight:900,fontSize:18,color:"#1c1917",marginBottom:4}}>📸 Memory Book</div>
      <div style={{fontSize:13,color:"#6b7280",marginBottom:16,fontWeight:600,lineHeight:1.6}}>Your treasured family cookbook — every dish you've cooked together! 💛</div>

      {/* Certificate print overlay */}
      {printing&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setPrint(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:24,padding:24,maxWidth:360,width:"100%"}}>
            <div style={{background:"linear-gradient(135deg,#fff7ed,#fef3c7)",border:"4px solid #f97316",borderRadius:18,padding:22,textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:36,marginBottom:6}}>👨‍🍳</div>
              <div style={{fontWeight:900,fontSize:17,color:"#f97316",marginBottom:3}}>Certificate of Achievement</div>
              <div style={{fontSize:12,color:"#9a3412",fontWeight:700,marginBottom:10}}>This certifies that a Young Chef</div>
              <div style={{fontWeight:900,fontSize:18,color:"#1c1917",marginBottom:4}}>successfully cooked</div>
              <div style={{fontWeight:900,fontSize:18,color:"#f97316",marginBottom:6}}>🍽️ {printing.dish}</div>
              <div style={{fontSize:11,color:"#9ca3af"}}>on {printing.date}</div>
              {printing.note&&<div style={{fontSize:12,color:"#9a3412",fontStyle:"italic",margin:"10px 0 0"}}>"{printing.note}"</div>}
              <div style={{marginTop:12,fontSize:10,color:"#9ca3af"}}>Sizzle & Zesty Kitchen Academy 🔥🍋</div>
            </div>
            {printing.img&&<img src={printing.img} alt="" style={{width:"100%",borderRadius:12,height:140,objectFit:"cover",marginBottom:12}}/>}
            <button onClick={()=>window.print()} style={{...BTN,background:"linear-gradient(135deg,#f97316,#fbbf24)",marginBottom:8}}>🖨️ Print Certificate</button>
            <button onClick={()=>setPrint(null)} style={{...BTN,background:"#f5f5f4",color:"#374151"}}>Close</button>
          </div>
        </div>
      )}

      {adding?(
        <div>
          <div onClick={()=>fileRef.current?.click()} style={{background:"#fdf2f8",border:"2px dashed #ec4899",borderRadius:14,padding:14,textAlign:"center",marginBottom:12,cursor:"pointer"}}>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f){const rd=new FileReader();rd.onload=ev=>setImg(ev.target.result);rd.readAsDataURL(f);}}}/>
            {img?<img src={img} alt="" style={{width:"100%",borderRadius:10,maxHeight:150,objectFit:"cover"}}/>:<><div style={{fontSize:32,marginBottom:4}}>📷</div><div style={{fontWeight:800,color:"#db2777",fontSize:13}}>Tap to add a photo</div><div style={{fontSize:11,color:"#9ca3af"}}>Show off your masterpiece!</div></>}
          </div>
          <input value={dish} onChange={e=>setDish(e.target.value)} placeholder="What did you cook? e.g. Mango Lassi 🥭" style={{...INP,borderColor:"#fbcfe8"}}/>
          <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Write a memory… Who cooked with you? How did it taste? What was special?"
            style={{...INP,resize:"none",height:80,marginBottom:12}}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setAdding(false)} style={{flex:1,background:"#f5f5f4",border:"none",borderRadius:12,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",color:"#6b7280"}}>Cancel</button>
            <button onClick={addMem} disabled={!dish.trim()} style={{flex:2,...BTN,background:"linear-gradient(135deg,#db2777,#ec4899)",borderRadius:12,padding:"13px 0",opacity:!dish.trim()?0.5:1}}>💾 Save Memory</button>
          </div>
        </div>
      ):(
        <>
          <button onClick={()=>setAdding(true)} style={{...BTN,background:"linear-gradient(135deg,#db2777,#ec4899)",marginBottom:16}}>+ Add New Memory 📸</button>
          {mems.length===0?(
            <div style={{textAlign:"center",padding:"32px 20px",color:"#9ca3af"}}>
              <div style={{fontSize:48,marginBottom:8}}>📖</div>
              <div style={{fontWeight:700,fontSize:15}}>Your cookbook is empty!</div>
              <div style={{fontSize:13,marginTop:4}}>Cook something delicious and add your first memory.</div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {mems.map(m=>(
                <div key={m.id} style={{background:"linear-gradient(135deg,#fdf2f8,#fce7f3)",border:"1.5px solid #fbcfe8",borderRadius:16,overflow:"hidden"}}>
                  {m.img&&<img src={m.img} alt="" style={{width:"100%",height:140,objectFit:"cover"}}/>}
                  <div style={{padding:"12px 14px"}}>
                    <div style={{fontWeight:900,fontSize:15,color:"#1c1917",marginBottom:2}}>{m.dish}</div>
                    <div style={{fontSize:11,color:"#9ca3af",marginBottom:m.note?6:10}}>{m.date}</div>
                    {m.note&&<div style={{fontSize:12,color:"#9a3412",fontStyle:"italic",marginBottom:10}}>"{m.note}"</div>}
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>setPrint(m)} style={{flex:1,background:"#fff7ed",border:"1.5px solid #fed7aa",color:"#9a3412",borderRadius:10,padding:"8px",fontSize:12,fontWeight:700,cursor:"pointer"}}>🏅 Print Certificate</button>
                      <button onClick={()=>save(mems.filter(x=>x.id!==m.id))} style={{background:"#fef2f2",border:"1.5px solid #fca5a5",color:"#dc2626",borderRadius:10,padding:"8px 12px",fontSize:12,fontWeight:700,cursor:"pointer"}}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Feature 4: Cooking Quest ─────────────────────────────────
function QuestScreen(){
  const [badges,setBadges]=useState(()=>{try{return JSON.parse(localStorage.getItem("sz_badges_v1")||"[]")}catch{return []}});
  const [pts,setPts]=useState(()=>{try{return parseInt(localStorage.getItem("sz_pts_v1")||"0")}catch{return 0}});
  const parentTitle=[...PARENT_TITLES].reverse().find(t=>pts>=t.min)||PARENT_TITLES[0];
  const earned=BADGES.filter(b=>badges.includes(b.id));
  const unlock=(b)=>{
    const n=[...badges,b.id]; setBadges(n);
    const np=pts+b.pts; setPts(np);
    try{localStorage.setItem("sz_badges_v1",JSON.stringify(n));localStorage.setItem("sz_pts_v1",String(np))}catch{}
  };
  return(
    <div style={{padding:16,paddingBottom:90}}>
      <div style={{fontWeight:900,fontSize:18,color:"#1c1917",marginBottom:4}}>⚔️ Cooking Quest</div>
      <div style={{fontSize:13,color:"#6b7280",marginBottom:14,fontWeight:600}}>Earn badges, unlock achievements, level up your family! 🌟</div>
      {/* Parent title */}
      <div style={{background:"linear-gradient(135deg,#fff7ed,#fef3c7)",border:"2px solid #fbbf24",borderRadius:20,padding:18,marginBottom:14,textAlign:"center"}}>
        <div style={{fontSize:10,fontWeight:800,color:"#9a3412",marginBottom:4,letterSpacing:1}}>👨‍👩‍👧 YOUR PARENT TITLE</div>
        <div style={{fontWeight:900,fontSize:22,color:parentTitle.color,marginBottom:4}}>{parentTitle.label}</div>
        <div style={{fontSize:12,color:"#9a3412",fontWeight:600}}>{pts} family points · {earned.length}/{BADGES.length} badges</div>
        <div style={{background:"#fef3c7",borderRadius:99,height:8,margin:"10px 0 4px",overflow:"hidden"}}>
          <div style={{width:`${Math.min(100,(pts/200)*100)}%`,height:"100%",background:"linear-gradient(90deg,#f97316,#fbbf24)",borderRadius:99,transition:"width 1s"}}/>
        </div>
        <div style={{fontSize:10,color:"#9ca3af"}}>Cook more to reach Master Kitchen Family 🌟</div>
      </div>
      {earned.length>0&&<>
        <div style={{fontWeight:800,fontSize:14,color:"#1c1917",marginBottom:8}}>🏅 Your Badges</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {earned.map(b=>(
            <div key={b.id} style={{background:"linear-gradient(135deg,#fff7ed,#fef3c7)",border:"2px solid #fbbf24",borderRadius:16,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:3}}>{b.icon}</div>
              <div style={{fontWeight:900,fontSize:12,color:"#1c1917"}}>{b.name}</div>
              <div style={{fontSize:10,color:"#9a3412",margin:"2px 0 4px",lineHeight:1.4}}>{b.desc}</div>
              <span style={{background:"#fff7ed",color:"#f97316",border:"1.5px solid #fed7aa",borderRadius:8,padding:"1px 7px",fontSize:10,fontWeight:900}}>+{b.pts} XP</span>
            </div>
          ))}
        </div>
      </>}
      <div style={{fontWeight:800,fontSize:14,color:"#1c1917",marginBottom:8}}>🔒 Unlock These Badges</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {BADGES.filter(b=>!badges.includes(b.id)).map(b=>(
          <div key={b.id} onClick={()=>unlock(b)} style={{background:"#f9fafb",border:"1.5px solid #e5e7eb",borderRadius:16,padding:"12px",textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:28,marginBottom:3,filter:"grayscale(1)"}}>{b.icon}</div>
            <div style={{fontWeight:900,fontSize:12,color:"#6b7280"}}>{b.name}</div>
            <div style={{fontSize:10,color:"#9ca3af",margin:"2px 0 4px",lineHeight:1.4}}>{b.desc}</div>
            <span style={{fontSize:10,color:"#059669",fontWeight:800,background:"#ecfdf5",border:"1.5px solid #86efac",borderRadius:8,padding:"1px 7px"}}>Tap to unlock +{b.pts} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Feature 9: 30-Min Recipes ────────────────────────────────
function QuickScreen(){
  const [filter,setFilter]=useState("all");
  const [sel,setSel]=useState(null);
  const [steps,setSteps]=useState(""); const [load,setLoad]=useState(false);
  const filtered=QUICK_RECIPES.filter(r=>filter==="all"||r.diet===filter||r.tags.includes(filter));
  const getSteps=async(r)=>{
    setSel(r); setSteps(""); setLoad(true);
    const res=await askClaude(
      "You are Sizzle, family chef. Give a complete quick recipe: ingredients list then numbered steps (max 6). Simple enough for a kid 10+ with adult help. Under 180 words. Enthusiastic!",
      `Complete recipe for ${r.name} (${r.time} minutes, ${r.level}). Family-friendly.`,400
    );
    setSteps(res||`Here's how to make ${r.name}!\n\n1. Gather ingredients\n2. Prep and chop as needed\n3. Cook on medium heat\n4. Season to taste\n5. Serve hot!\n\nDone in ${r.time} minutes! 🔥`);
    setLoad(false);
  };
  const tc=t=>t<=15?"#059669":t<=22?"#f97316":"#dc2626";
  return(
    <div style={{padding:16,paddingBottom:90}}>
      {sel?(
        <>
          <button onClick={()=>setSel(null)} style={BK}>← Back to recipes</button>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:32}}>{sel.emoji}</div>
            <div>
              <div style={{fontWeight:900,fontSize:16,color:"#1c1917"}}>{sel.name}</div>
              <span style={{background:`${tc(sel.time)}18`,color:tc(sel.time),border:`1.5px solid ${tc(sel.time)}44`,borderRadius:8,padding:"2px 8px",fontSize:11,fontWeight:800}}>⏱ {sel.time} min</span>
            </div>
          </div>
          <AIBox text={steps} loading={load}/>
        </>
      ):(
        <>
          <div style={{fontWeight:900,fontSize:18,color:"#1c1917",marginBottom:4}}>⚡ 30-Min Recipes</div>
          <div style={{fontSize:13,color:"#6b7280",marginBottom:14,fontWeight:600}}>Fast. Delicious. Family-approved. Always under 30 minutes. 🚀</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
            {["all","veg","non-veg","breakfast","dinner","snack"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?"#0284c7":"#f0f9ff",color:filter===f?"white":"#0284c7",border:`1.5px solid ${filter===f?"#0284c7":"#bae6fd"}`,borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                {f==="all"?"All ⚡":f}
              </button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {filtered.map(r=>(
              <div key={r.id} onClick={()=>getSteps(r)} style={{background:"white",border:"1.5px solid #e0f2fe",borderRadius:16,padding:14,cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
                <div style={{fontSize:30,flexShrink:0}}>{r.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:900,fontSize:14,color:"#1c1917",marginBottom:2}}>{r.name}</div>
                  <div style={{fontSize:11,color:"#6b7280",marginBottom:6}}>{r.desc}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    <span style={{background:`${tc(r.time)}18`,color:tc(r.time),border:`1.5px solid ${tc(r.time)}44`,borderRadius:8,padding:"2px 8px",fontSize:11,fontWeight:800}}>⏱ {r.time} min</span>
                    <span style={{background:"#f0f9ff",color:"#0284c7",border:"1.5px solid #bae6fd",borderRadius:8,padding:"2px 8px",fontSize:11,fontWeight:700}}>{r.level}</span>
                    {r.diet==="veg"
                      ?<span style={{background:"#dcfce7",color:"#166534",border:"1.5px solid #86efac",borderRadius:8,padding:"2px 8px",fontSize:11,fontWeight:700}}>🌿 Veg</span>
                      :<span style={{background:"#fee2e2",color:"#991b1b",border:"1.5px solid #fca5a5",borderRadius:8,padding:"2px 8px",fontSize:11,fontWeight:700}}>🍗 Non-Veg</span>}
                  </div>
                </div>
                <div style={{fontSize:18,color:"#0284c7",flexShrink:0}}>›</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🍳  COOK ALONG — fully rebuilt, all bugs fixed
//     • stepRef pattern fixes stale-closure button bug
//     • Cook Another properly resets all state
//     • Exit mid-recipe dialog
//     • Animated chef cooking panel per step
//     • Step action SVG illustration
// ═══════════════════════════════════════════════════════════════
function CookAlong({ recipe, profile, onBack }) {
  const [stepUI,     setStepUI]   = useState(-1);
  const stepRef    = useRef(-1);
  // setStep is stable — use useCallback so goStep/doNext never capture a stale version
  const setStep    = useCallback((n) => { stepRef.current = n; setStepUI(n); }, []);

  const [speaking,   setSpeaking] = useState(false);
  const [done,       setDone]     = useState(false);
  const [parentOk,   setParentOk] = useState(false);
  const [pIn,        setPIn]      = useState("");
  const [pErr,       setPErr]     = useState("");
  const [pAttempts,  setPAttempts]= useState(0);

  // Pool of maths questions — random one picked per attempt
  const MATH_QS = [
    {q:"47 × 3",  a:141}, {q:"68 + 57",  a:125}, {q:"124 − 37", a:87},
    {q:"9 × 12",  a:108}, {q:"144 ÷ 12", a:12},  {q:"56 + 78",  a:134},
    {q:"13 × 8",  a:104}, {q:"200 − 63", a:137},  {q:"7 × 17",   a:119},
    {q:"96 ÷ 8",  a:12},  {q:"45 + 88",  a:133},  {q:"15 × 9",   a:135},
  ];
  const [qIdx, setQIdx] = useState(()=>Math.floor(Math.random()*12));
  const currentQ = MATH_QS[qIdx];

  const checkAnswer = () => {
    if (parseInt(pIn) === currentQ.a) {
      setParentOk(true);
    } else {
      const nextIdx = (qIdx + 1 + Math.floor(Math.random() * (MATH_QS.length - 1))) % MATH_QS.length;
      setQIdx(nextIdx);
      setPIn("");
      setPAttempts(n => n + 1);
      setPErr(pAttempts === 0
        ? "Not quite! Here's a new question — try again! 🧮"
        : pAttempts === 1
        ? "Almost! One more try with a fresh question 💪"
        : "Keep going! A new question each time 🔥"
      );
      setTimeout(() => setPErr(""), 2500);
    }
  };
  const [listening,  setListening]= useState(false);
  const [voiceHint,  setVoiceHint]= useState("");
  const [showExit,   setShowExit] = useState(false);
  const [cheerOn,    setCheerOn]  = useState(false);

  const recognizer = useRef(null);
  const synthRef   = useRef(typeof window !== "undefined" && window.speechSynthesis ? window.speechSynthesis : null);
  const Chef       = profile.chefChoice === "zesty" ? Zesty : Sizzle;
  const accent     = profile.chefChoice === "zesty" ? "#65a30d" : "#f97316";
  const lv         = LEVELS[recipe.level] || LEVELS.starter;

  const steps = recipe.steps || [
    {text:"Gather all ingredients on a clean surface.", speech:`Right! Collect all your ingredients — clean surface, clean hands, let's go!`, safety:false},
    {text:"Wash your hands with soap for 20 seconds.", speech:`Rule one — always wash your hands! 20 seconds, no shortcuts!`, safety:false},
    {text:`Prepare all ingredients for ${recipe.name}.`, speech:`Now let's prep! Measure carefully, arrange everything neatly!`, safety:false},
    {text:"Combine and cook as directed.", speech:`This is the magic part! Follow each step carefully. You're brilliant!`, safety:false},
    {text:`Serve your ${recipe.name} and enjoy!`, speech:`DONE! Your ${recipe.name} looks incredible! You are a real chef!`, safety:false},
  ];

  const dish = DISH_ART[recipe.id];

  // ── speak ──────────────────────────────────────────────────
  const speak = useCallback((text, cb) => {
    if (!("speechSynthesis" in window)) { cb?.(); return; }
    synthRef.current?.cancel?.();
    const u = new SpeechSynthesisUtterance(text);
    const vs = synthRef.current?.getVoices?.() || [];
    const v = vs.find(x => x.lang === "en-IN") || vs.find(x => x.lang.startsWith("en"));
    if (v) u.voice = v;
    u.rate = 0.9; u.pitch = 1.12;
    u.onstart = () => setSpeaking(true);
    u.onend   = () => { setSpeaking(false); cb?.(); };
    u.onerror = () => { setSpeaking(false); cb?.(); };
    synthRef.current?.speak?.(u);
  }, []);

  // ── voice recognition ─────────────────────────────────────
  const startListening = useCallback((onTrigger) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (recognizer.current) { try { recognizer.current.stop(); } catch(e){} }
    const r = new SR();
    r.continuous = false; r.interimResults = false; r.lang = "en-IN";
    r.onstart  = () => { setListening(true); setVoiceHint("🎤 Listening… say Done or Ho Gaya!"); };
    r.onend    = () => { setListening(false); setVoiceHint(""); };
    r.onresult = (e) => {
      const txt = Array.from(e.results).map(r => r[0].transcript).join(" ").toLowerCase().trim();
      const ok = ["done","ho gaya","hogaya","finish","finished","next","aagla","complete","ready","kar liya","yes","haan","aage"];
      if (ok.some(w => txt.includes(w))) {
        setVoiceHint("✅ Got it!"); setTimeout(() => { setVoiceHint(""); onTrigger(); }, 350);
      } else {
        setVoiceHint(`Heard: "${txt.slice(0,22)}" — say Done!`); setTimeout(() => setVoiceHint(""), 2500);
      }
    };
    r.onerror = () => { setListening(false); setVoiceHint(""); };
    recognizer.current = r;
    try { r.start(); } catch(e){}
  }, []);

  // ── doNext uses stepRef — no stale closure ─────────────────
  const doNext = useCallback(() => {
    const n = stepRef.current + 1;
    if (n >= steps.length) {
      setDone(true);
      speak(`Absolutely incredible ${profile.kidName}! You made ${recipe.name}! ${profile.chefChoice==="zesty"?"Zesty is SO proud of you! 🍋":"Sizzle is BLOWN AWAY! 🔥"}`);
    } else {
      setStep(n);
      speak(steps[n].speech || steps[n].text, () => {
        if (!steps[n]?.safety) startListening(doNext);
      });
    }
  }, [steps, speak, startListening, profile, recipe, setStep]);

  const goStep = useCallback((n) => {
    setStep(n);
    speak(steps[n]?.speech || steps[n]?.text || "", () => {
      if (!steps[n]?.safety) startListening(doNext);
    });
  }, [steps, speak, startListening, doNext, setStep]);

  useEffect(() => () => {
    synthRef.current?.cancel?.();
    if (recognizer.current) { try { recognizer.current.stop(); } catch(e){} }
  }, []);

  const step   = stepUI;
  const isSafe = steps[step]?.safety;
  const pct    = step >= 0 ? ((step + 1) / steps.length) * 100 : 0;

  // ── Single return — all screens rendered conditionally inside ──
  return (
    <div style={{minHeight:"100vh",background:"#fafaf9"}}>

      {/* Exit dialog — always mounted, shown/hidden via showExit */}
      {showExit && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"white",borderRadius:24,padding:28,maxWidth:320,width:"100%",textAlign:"center",boxShadow:"0 16px 48px rgba(0,0,0,0.3)"}}>
            <div style={{fontSize:48,marginBottom:10}}>🤔</div>
            <h3 style={{fontSize:19,fontWeight:900,color:"#1c1917",margin:"0 0 8px"}}>Leave this recipe?</h3>
            <p style={{color:"#6b7280",fontSize:13,marginBottom:22}}>
              You're on step <b>{step+1}</b> of <b>{steps.length}</b>.<br/>Progress won't be saved.
            </p>
            <button onClick={()=>{
              synthRef.current?.cancel?.();
              if (recognizer.current) { try { recognizer.current.stop(); } catch(e){} }
              setShowExit(false);
              onBack();
            }} style={{...BTN,background:"#ef4444",marginBottom:10}}>
              🚪 Yes, pick another recipe
            </button>
            <button onClick={()=>setShowExit(false)} style={{...BTN,background:accent}}>
              👨‍🍳 No! Keep cooking
            </button>
          </div>
        </div>
      )}

      {/* ── DONE SCREEN ── */}
      {done && (
        <div style={{padding:18,maxWidth:440,margin:"0 auto",textAlign:"center"}}>
          <div style={CARD}>
            <div style={{fontSize:54,marginBottom:4}}>🎉🏆🎉</div>
            <Chef mood="excited" size={110} speaking={speaking}/>
            <h2 style={{fontSize:25,fontWeight:900,color:accent,margin:"12px 0 4px"}}>
              {profile.chefChoice==="zesty"?"That's SO Zesty! 🍋":"That's SIZZLING! 🔥"}
            </h2>
            <p style={{color:"#6b7280",marginBottom:18}}>
              <b>{profile.kidName}</b> cooked <b>{recipe.name}</b>!
            </p>
            {dish && (
              <div style={{background:`linear-gradient(135deg,${accent}18,${accent}06)`,border:`2px solid ${accent}44`,borderRadius:20,padding:22,marginBottom:16}}>
                <div style={{fontSize:52,letterSpacing:8,marginBottom:10,lineHeight:1.2}}>{dish.art}</div>
                <div style={{fontWeight:900,fontSize:14,color:accent,marginBottom:4}}>🍽️ Your finished dish!</div>
                <div style={{fontSize:12,color:"#6b7280",fontStyle:"italic"}}>{dish.caption}</div>
              </div>
            )}
            <div style={{background:lv.bg,border:`2px solid ${lv.border}`,borderRadius:16,padding:18,marginBottom:20}}>
              <div style={{fontSize:28,marginBottom:4}}>🏅</div>
              <div style={{fontWeight:900,fontSize:14,color:lv.color}}>{lv.badge} Unlocked!</div>
              <div style={{fontSize:12,color:"#6b7280",marginTop:2}}>{recipe.badge}</div>
            </div>
            {/* Cook Another — goes back to recipe list */}
            <button
              onClick={()=>{
                synthRef.current?.cancel?.();
                if (recognizer.current) { try { recognizer.current.stop(); } catch(e){} }
                onBack();
              }}
              style={{...BTN,background:`linear-gradient(135deg,${accent},${accent}cc)`,marginBottom:10}}
            >
              🍳 Cook Another Recipe!
            </button>
            {/* Go to Home */}
            <button
              onClick={()=>{
                synthRef.current?.cancel?.();
                if (recognizer.current) { try { recognizer.current.stop(); } catch(e){} }
                onBack();
              }}
              style={{...BTN,background:"#f5f5f4",color:"#374151"}}
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      )}

      {/* ── PARENT GATE ── */}
      {!done && recipe.level==="boss" && !parentOk && step===-1 && (
        <div style={{padding:18,maxWidth:440,margin:"0 auto"}}>
          <button onClick={onBack} style={BK}>← Back</button>
          <div style={{...CARD,textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:8}}>🔥👨‍👩‍👧</div>
            <Chef mood="warning" size={80}/>
            <h3 style={{fontSize:18,fontWeight:900,color:"#1c1917",margin:"12px 0 6px"}}>Chef Boss Mode — Grown-Up Required!</h3>
            <p style={{color:"#6b7280",fontSize:13,marginBottom:18}}><b>{recipe.name}</b> involves real fire. A parent must be present.</p>
            <div style={{background:"#fff7ed",borderRadius:14,padding:18,marginBottom:16}}>
              <p style={{fontWeight:700,color:"#9a3412",marginBottom:4}}>👨 Grown-Up maths check!</p>
              <p style={{fontSize:12,color:"#9a3412",marginBottom:12,fontWeight:600}}>Solve this to confirm a grown-up is present</p>
              <p style={{fontSize:34,fontWeight:900,color:accent,marginBottom:14,letterSpacing:1}}>{currentQ.q} = ?</p>
              <input value={pIn} onChange={e=>setPIn(e.target.value.replace(/\D/g,""))}
                placeholder="Type your answer"
                style={{...INP,textAlign:"center",fontSize:24,marginBottom:6}}
                onKeyDown={e=>{ if(e.key==="Enter") checkAnswer(); }}/>
              {pErr && (
                <p style={{color:"#f97316",fontSize:13,marginTop:4,fontWeight:700,animation:"fadeIn 0.3s ease-out"}}>
                  {pErr}
                </p>
              )}
              {pAttempts > 0 && (
                <p style={{color:"#9ca3af",fontSize:11,marginTop:6}}>Attempts: {pAttempts} — a new question appears each time!</p>
              )}
            </div>
            <button onClick={checkAnswer} style={{...BTN,background:accent}}>
              I'm a Grown-Up ✅ Let's Cook!
            </button>
          </div>
        </div>
      )}

      {/* ── INTRO SCREEN ── */}
      {!done && !(recipe.level==="boss" && !parentOk && step===-1) && step===-1 && (
        <div style={{padding:18,maxWidth:440,margin:"0 auto"}}>
          <button onClick={onBack} style={BK}>← Back</button>
          <div style={CARD}>
            <div style={{textAlign:"center",marginBottom:16}}>
              {dish && <div style={{fontSize:44,letterSpacing:5,marginBottom:6,lineHeight:1.3}}>{dish.art}</div>}
              <div style={{fontSize:46}}>{recipe.emoji}</div>
              <h2 style={{fontSize:22,fontWeight:900,color:"#1c1917",margin:"8px 0 3px"}}>{recipe.name}</h2>
              <p style={{color:"#a8a29e",fontSize:12,marginBottom:10}}>{recipe.hindi} · {recipe.time}</p>
              <div style={{display:"flex",gap:7,justifyContent:"center",flexWrap:"wrap"}}>
                <span style={{background:lv.bg,color:lv.color,border:`1.5px solid ${lv.border}`,borderRadius:10,padding:"4px 10px",fontSize:11,fontWeight:700}}>{lv.icon} {lv.name}</span>
                <span style={{background:recipe.diet==="veg"?"#dcfce7":"#fee2e2",color:recipe.diet==="veg"?"#166534":"#991b1b",borderRadius:10,padding:"4px 10px",fontSize:11,fontWeight:700}}>{recipe.diet==="veg"?"🌿 Veg":"🍗 Non-Veg"}</span>
              </div>
            </div>
            {recipe.ingredients && (
              <div style={{background:"#fff7ed",borderRadius:14,padding:14,marginBottom:14}}>
                <p style={{fontWeight:700,color:"#9a3412",margin:"0 0 5px",fontSize:13}}>🛒 You'll need:</p>
                <p style={{color:"#6b7280",fontSize:12,margin:0,lineHeight:1.9}}>{recipe.ingredients.join(" · ")}</p>
              </div>
            )}
            <div style={{background:"#eff6ff",borderRadius:12,padding:11,marginBottom:16,fontSize:12,color:"#1e40af"}}>
              👨‍🍳 <b>{profile.chefChoice==="zesty"?"Zesty":"Sizzle"}</b> will cook right alongside you!<br/>
              Say <b>"Done"</b> or <b>"Ho Gaya"</b> to advance — or tap the button.
            </div>
            <button
              onClick={()=>goStep(0)}
              style={{...BTN,background:profile.chefChoice==="zesty"?"linear-gradient(135deg,#65a30d,#a3e635)":"linear-gradient(135deg,#f97316,#fbbf24)"}}>
              🎉 Let's Cook Together — Chalo!
            </button>
          </div>
        </div>
      )}

      {/* ── ACTIVE STEP SCREEN ── */}
      {!done && step>=0 && (
        <div style={{padding:14,maxWidth:480,margin:"0 auto",paddingBottom:24}}>

          {/* Top bar */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <button onClick={()=>setShowExit(true)}
              style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#6b7280",fontWeight:600,padding:"4px 0"}}>
              ← Change Recipe
            </button>
            <div style={{fontSize:12,color:"#a8a29e",fontWeight:600}}>Step {step+1} / {steps.length}</div>
          </div>

          {/* Progress bar */}
          <div style={{background:"#f5f5f4",borderRadius:99,height:8,marginBottom:14}}>
            <div style={{background:`linear-gradient(90deg,${accent},${accent}88)`,borderRadius:99,height:8,width:`${pct}%`,transition:"width 0.5s"}}/>
          </div>

          {/* Chef live cooking panel */}
          <div style={{background:isSafe?"#fff1f2":`linear-gradient(135deg,${accent}12,${accent}04)`,border:`2px solid ${isSafe?"#fca5a5":accent+"33"}`,borderRadius:22,padding:16,marginBottom:14}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:14}}>
              <div style={{flexShrink:0}}>
                <Chef mood={isSafe?"warning":speaking?"excited":listening?"listening":"happy"} size={68} speaking={speaking}/>
              </div>
              <div style={{flex:1,background:"white",border:`2px solid ${isSafe?"#fca5a5":speaking?accent:listening?"#86efac":"#fed7aa"}`,borderRadius:"16px 16px 16px 4px",padding:"10px 13px",boxShadow:"0 2px 10px rgba(0,0,0,0.06)",transition:"border-color 0.3s"}}>
                <div style={{fontSize:10,fontWeight:800,color:isSafe?"#dc2626":accent,marginBottom:3}}>
                  {isSafe?"🔥 GROWN-UP STEP!":speaking?`🔊 ${profile.chefChoice==="zesty"?"Zesty":"Sizzle"} is cooking along…`:listening?"🎤 Listening…":`👨‍🍳 ${profile.chefChoice==="zesty"?"Zesty 🍋":"Sizzle 🔥"} says:`}
                </div>
                <div style={{fontSize:14,fontWeight:700,color:isSafe?"#7f1d1d":"#1c1917",lineHeight:1.65}}>
                  {steps[step]?.text?.replace("🔥 ADULT STEP: ","").replace("GROWN-UP — ","").replace("GROWN-UP: ","").replace("BUDDY STEP — ","")}
                </div>
              </div>
            </div>
            {/* Step illustration */}
            <div style={{background:"white",borderRadius:16,padding:"12px 0 4px",display:"flex",flexDirection:"column",alignItems:"center",boxShadow:"inset 0 1px 6px rgba(0,0,0,0.05)"}}>
              <div style={{transition:"opacity 0.4s",opacity:speaking?1:0.9}}>
                {getChefAction(steps[step]?.text||"", accent)}
              </div>
            </div>
          </div>

          {/* Voice hint */}
          {voiceHint && (
            <div style={{background:"#f0fdf4",border:"1.5px solid #86efac",borderRadius:12,padding:"7px 12px",marginBottom:10,fontSize:12,color:"#166534",fontWeight:700,textAlign:"center"}}>
              {voiceHint}
            </div>
          )}

          {/* Buttons */}
          {isSafe ? (
            <div style={{background:"#fff1f2",border:"2px solid #fca5a5",borderRadius:18,padding:18,textAlign:"center"}}>
              <div style={{fontSize:34,marginBottom:6}}>👨‍👩‍👧‍👦</div>
              <div style={{fontWeight:800,color:"#9f1239",fontSize:14,marginBottom:14}}>Grown-Up's turn — handle the fire!</div>
              <button onClick={doNext} style={{...BTN,background:"#dc2626"}}>
                ✅ Grown-Up Finished This Step
              </button>
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              <button onClick={doNext} style={{...BTN,background:`linear-gradient(135deg,${accent},${accent}cc)`,fontSize:17}}>
                {step+1>=steps.length?"🎉 Done! I want my badge!":"✅ Done! Next Step →"}
              </button>
              <div style={{textAlign:"center",fontSize:11,color:"#9ca3af",fontWeight:600}}>
                or say <b style={{color:accent}}>"Done!"</b> · <b style={{color:accent}}>"Ho Gaya!"</b> · <b style={{color:accent}}>"Aagla!"</b>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{ speak(steps[step]?.speech||steps[step]?.text, ()=>{ if(!steps[step]?.safety) startListening(doNext); }); }}
                  style={{flex:1,background:"#f5f5f4",color:"#57534e",border:"none",borderRadius:13,padding:"11px 0",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                  🔊 Repeat
                </button>
                <button onClick={()=>startListening(doNext)}
                  style={{flex:1,background:listening?"#dcfce7":"#eff6ff",color:listening?"#166534":"#1e40af",border:`1.5px solid ${listening?"#86efac":"#93c5fd"}`,borderRadius:13,padding:"11px 0",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                  {listening?"🎤 Listening…":"🎤 Mic"}
                </button>
              </div>
              {/* ── NEW FEATURES ── */}
              <WhatMeansBtn stepText={steps[step]?.text||""} accent={accent}/>
              <OopsBtn recipeName={recipe.name} stepText={steps[step]?.text||""}/>
              <CheerBtn enabled={cheerOn} onToggle={()=>setCheerOn(v=>!v)} accent={accent}/>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
// ═══════════════════════════════════════════════════════════════
// 🔐  ONBOARDING
// ═══════════════════════════════════════════════════════════════
const AVATAR_ANIMALS = [
  // Royals & Fantasy
  "👸","🤴","🧙‍♀️","🧝‍♀️","🧚","🦄","🧜‍♀️","🧝‍♂️",
  // Superheroes & Action
  "🦸‍♀️","🦸‍♂️","🦹‍♀️","🥷","🦊","🐯","🦁","🐼",
  // Professionals
  "👩‍🍳","👨‍🍳","👩‍🚀","👨‍🚀","👩‍🔬","👨‍🎨","👩‍💻","🧑‍🎤",
  // Sports
  "⚽","🏆","🎾","🏊‍♀️","🧗‍♀️","🤸‍♀️","🏋️‍♀️","🎮",
];
const FOOD_INTERESTS = [
  {id:"sweet",  icon:"🍰", label:"Sweet Things"},
  {id:"savory", icon:"🧆", label:"Savoury Stuff"},
  {id:"global", icon:"🌍", label:"World Flavours"},
  {id:"healthy",icon:"🥗", label:"Healthy Vibes"},
  {id:"baking", icon:"🍞", label:"Baking Magic"},
  {id:"drinks", icon:"🥤", label:"Cool Drinks"},
];

const CSS_ONBOARD = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
  @keyframes zf { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes zin { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes pop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
  @keyframes starFloat { 0%,100%{transform:translateY(0) rotate(0)} 33%{transform:translateY(-12px) rotate(15deg)} 66%{transform:translateY(-6px) rotate(-10deg)} }
  @keyframes bgPulse { 0%,100%{opacity:0.4} 50%{opacity:0.7} }
  @keyframes slide-up { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes particle { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-80px) scale(0);opacity:0} }
  .font-syne { font-family:'Syne',sans-serif; }
  .font-dm { font-family:'DM Sans',sans-serif; }
`;

function FloatingFood({ items = ["🥭","🍋","🍓","🥑","🍕","🌮","🍜","🥗"], count = 12 }) {
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
      {Array.from({length:count}).map((_,i) => (
        <div key={i} style={{
          position:"absolute",
          left:`${5 + (i * 83 % 91)}%`,
          top:`${(i * 67 % 90)}%`,
          fontSize: 16 + (i % 3) * 8,
          opacity: 0.12 + (i % 4) * 0.06,
          animation: `starFloat ${3 + i * 0.7}s ease-in-out ${i * 0.3}s infinite`,
        }}>
          {items[i % items.length]}
        </div>
      ))}
    </div>
  );
}

function Onboarding({ onComplete }) {
  const [page, setPage]         = useState("splash");
  const [kidName, setKidName]   = useState("");
  const [kidAge, setKidAge]     = useState(null);
  const [avatar, setAvatar]     = useState("🦊");
  const [chef, setChef]         = useState(null);
  const [interests, setInterests] = useState([]);
  const [diet, setDiet]         = useState(null);
  const [done, setDone]         = useState(false);

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  // ── PAGE: SPLASH ────────────────────────────────────────────
  if (page === "splash") return (
    <div style={{
      minHeight:"100vh",
      background:"#0f0e0d",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:28, position:"relative", overflow:"hidden",
      fontFamily:"'DM Sans',system-ui,sans-serif",
    }}>
      <style>{CSS_ONBOARD}</style>
      <FloatingFood count={16}/>

      {/* Gradient orbs */}
      <div style={{position:"absolute",top:-120,left:-80,width:320,height:320,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(249,115,22,0.25) 0%,transparent 70%)",animation:"bgPulse 4s ease-in-out infinite"}}/>
      <div style={{position:"absolute",bottom:-100,right:-60,width:280,height:280,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(101,163,13,0.2) 0%,transparent 70%)",animation:"bgPulse 4s ease-in-out 2s infinite"}}/>

      {/* Logo */}
      <div style={{position:"relative",marginBottom:24,animation:"zin 0.6s ease-out both"}}>
        <div style={{display:"flex",gap:0,alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{fontSize:64,lineHeight:1,filter:"drop-shadow(0 8px 24px rgba(249,115,22,0.5))"}}>🔥</div>
          <div style={{fontSize:48,lineHeight:1,marginLeft:-8,filter:"drop-shadow(0 8px 24px rgba(101,163,13,0.4))"}}>🍋</div>
        </div>
      </div>

      <div style={{textAlign:"center",animation:"zin 0.6s ease-out 0.15s both"}}>
        <h1 className="font-syne" style={{
          fontSize:48, fontWeight:900, margin:"0 0 8px", letterSpacing:-2,
          background:"linear-gradient(135deg,#f97316 0%,#fbbf24 40%,#a3e635 80%,#34d399 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          backgroundSize:"200% 200%", animation:"shimmer 3s linear infinite",
        }}>
          Sizzle &<br/>Zesty
        </h1>
        <p style={{color:"rgba(255,255,255,0.6)",fontSize:15,fontWeight:500,marginBottom:6}}>
          The world's coolest kids' kitchen
        </p>
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:32}}>
          {["🌍 50+ Global Recipes","🎯 3 Skill Levels","🎤 Voice Guided","🤖 AI Chef Help"].map(t=>(
            <span key={t} style={{background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.7)",
              borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:600,border:"1px solid rgba(255,255,255,0.12)"}}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div style={{width:"100%",maxWidth:300,animation:"zin 0.6s ease-out 0.3s both"}}>
        <button onClick={()=>setPage("name")} style={{
          width:"100%",background:"linear-gradient(135deg,#f97316,#fbbf24)",
          color:"white",border:"none",borderRadius:20,padding:"18px 0",
          fontSize:18,fontWeight:800,cursor:"pointer",
          boxShadow:"0 8px 32px rgba(249,115,22,0.45)",
          fontFamily:"'Syne',sans-serif", letterSpacing:-0.3,
          marginBottom:12,
        }}>
          🚀 Start Cooking!
        </button>
        <button style={{
          width:"100%",background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.8)",
          border:"1.5px solid rgba(255,255,255,0.15)",borderRadius:20,padding:"16px 0",
          fontSize:15,fontWeight:600,cursor:"pointer",backdropFilter:"blur(8px)",
        }}>
          👋 I already have an account
        </button>
      </div>

      <p style={{color:"rgba(255,255,255,0.25)",fontSize:10,marginTop:28,textAlign:"center",animation:"zin 0.6s ease-out 0.5s both"}}>
        🛡️ Safe for kids · No ads · COPPA compliant · Data never sold
      </p>
    </div>
  );

  // ── PAGE: NAME ───────────────────────────────────────────────
  if (page === "name") return (
    <div style={{minHeight:"100vh",background:"linear-gradient(180deg,#fff7ed 0%,#fef9c3 100%)",
      display:"flex",flexDirection:"column",padding:"32px 24px",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <style>{CSS_ONBOARD}</style>
      <div style={{marginBottom:32}}>
        <div style={{fontSize:10,fontWeight:700,color:"#9ca3af",letterSpacing:2,marginBottom:8}}>STEP 1 OF 4</div>
        <div style={{background:"#f5f5f4",borderRadius:99,height:4,overflow:"hidden",marginBottom:24}}>
          <div style={{width:"25%",height:"100%",background:"linear-gradient(90deg,#f97316,#fbbf24)",borderRadius:99}}/>
        </div>
        <h2 className="font-syne" style={{fontSize:34,fontWeight:900,color:"#1c1917",margin:"0 0 6px",letterSpacing:-1}}>
          Hey there,<br/>young chef! 👋
        </h2>
        <p style={{color:"#6b7280",fontSize:15,fontWeight:500}}>What's your name?</p>
      </div>

      <div style={{flex:1}}>
        {/* Animated chef illustration */}
        <div style={{textAlign:"center",marginBottom:28,animation:"zf 3s ease-in-out infinite"}}>
          <div style={{fontSize:72}}>👨‍🍳</div>
          <div style={{background:"rgba(249,115,22,0.1)",borderRadius:20,padding:"10px 18px",
            display:"inline-block",marginTop:8,border:"1.5px solid rgba(249,115,22,0.2)"}}>
            <span style={{fontSize:13,fontWeight:700,color:"#9a3412"}}>
              {kidName ? `Hi ${kidName}! I'm Sizzle 🔥` : "I can't wait to cook with you!"}
            </span>
          </div>
        </div>

        <div style={{position:"relative",marginBottom:20}}>
          <input
            value={kidName}
            onChange={e=>setKidName(e.target.value)}
            placeholder="Your chef name here…"
            maxLength={20}
            autoFocus
            style={{
              width:"100%",padding:"20px 20px",fontSize:22,fontWeight:700,
              border:"3px solid",borderColor:kidName?"#f97316":"#e5e7eb",
              borderRadius:20,outline:"none",textAlign:"center",
              background:"white",color:"#1c1917",transition:"border-color 0.3s",
              fontFamily:"'Syne',sans-serif",boxSizing:"border-box",letterSpacing:-0.5,
            }}
          />
          {kidName && <div style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",fontSize:24}}>✨</div>}
        </div>

        {/* Popular names for inspiration */}
        <p style={{color:"#9ca3af",fontSize:12,fontWeight:600,textAlign:"center",marginBottom:10}}>Popular chef names:</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:32}}>
          {["Arjun","Ananya","Rohan","Priya","Dev","Meera","Aarav","Zara"].map(n=>(
            <button key={n} onClick={()=>setKidName(n)} style={{
              background:kidName===n?"#fff7ed":"white",
              border:`2px solid ${kidName===n?"#f97316":"#e5e7eb"}`,
              color:kidName===n?"#f97316":"#6b7280",
              borderRadius:99,padding:"6px 14px",fontSize:13,fontWeight:700,cursor:"pointer",
              transition:"all 0.15s",
            }}>{n}</button>
          ))}
        </div>
      </div>

      <button
        onClick={()=>setPage("age")}
        disabled={!kidName.trim()}
        style={{
          width:"100%",background:kidName?"linear-gradient(135deg,#f97316,#fbbf24)":"#e5e7eb",
          color:kidName?"white":"#9ca3af",border:"none",borderRadius:20,
          padding:"18px 0",fontSize:17,fontWeight:800,cursor:kidName?"pointer":"default",
          fontFamily:"'Syne',sans-serif",transition:"all 0.3s",
          boxShadow:kidName?"0 6px 24px rgba(249,115,22,0.35)":"none",
        }}>
        Next → {kidName ? `Let's go, ${kidName}!` : "Enter your name first"}
      </button>
    </div>
  );

  // ── PAGE: AGE ────────────────────────────────────────────────
  if (page === "age") return (
    <div style={{minHeight:"100vh",background:"#0f0e0d",
      display:"flex",flexDirection:"column",padding:"32px 24px",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <style>{CSS_ONBOARD}</style>
      <FloatingFood count={8}/>

      <button onClick={()=>setPage("name")} style={{background:"none",border:"none",cursor:"pointer",
        color:"rgba(255,255,255,0.5)",fontSize:14,fontWeight:600,textAlign:"left",marginBottom:20,
        display:"flex",alignItems:"center",gap:6,padding:0}}>
        ← Back
      </button>

      <div style={{marginBottom:28}}>
        <div style={{fontSize:10,fontWeight:700,color:"#6b7280",letterSpacing:2,marginBottom:8}}>STEP 2 OF 4</div>
        <div style={{background:"rgba(255,255,255,0.1)",borderRadius:99,height:4,overflow:"hidden",marginBottom:24}}>
          <div style={{width:"50%",height:"100%",background:"linear-gradient(90deg,#f97316,#fbbf24)",borderRadius:99}}/>
        </div>
        <h2 className="font-syne" style={{fontSize:30,fontWeight:900,color:"white",margin:"0 0 4px",letterSpacing:-1}}>
          How old are you, {kidName}?
        </h2>
        <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,fontWeight:500}}>This unlocks the right recipes for you!</p>
      </div>

      {/* Age wheel */}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,width:"100%",maxWidth:340}}>
          {[7,8,9,10,11,12,13,14,15,16,17,18].map(a=>{
            const sel = kidAge===a;
            const level = a<=9?"⭐ Starter":a<=12?"🔥 Explorer":a<=15?"👑 Chef Boss":"🎓 Survival";
            return (
              <button key={a} onClick={()=>setKidAge(a)} style={{
                background:sel?"linear-gradient(135deg,#f97316,#fbbf24)":"rgba(255,255,255,0.06)",
                border:`2px solid ${sel?"#f97316":"rgba(255,255,255,0.1)"}`,
                borderRadius:16,padding:"16px 4px",cursor:"pointer",
                transition:"all 0.2s",
                boxShadow:sel?"0 4px 20px rgba(249,115,22,0.4)":"none",
              }}>
                <div className="font-syne" style={{fontSize:24,fontWeight:900,color:sel?"white":"rgba(255,255,255,0.8)"}}>{a}</div>
                <div style={{fontSize:8,color:sel?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.35)",fontWeight:700,marginTop:2}}>{level.split(" ")[0]}</div>
              </button>
            );
          })}
        </div>
        {kidAge && (
          <div style={{marginTop:24,background:"rgba(249,115,22,0.15)",border:"1.5px solid rgba(249,115,22,0.3)",
            borderRadius:16,padding:"12px 20px",textAlign:"center",animation:"pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both"}}>
            <div style={{color:"#fbbf24",fontWeight:800,fontSize:14}}>
              {kidAge<=9?"⭐ Starter — Solo Chef Mode! No fire needed.":
               kidAge<=12?"🔥 Explorer — Buddy Cook with a grown-up!":
               kidAge<=15?"👑 Chef Boss — Real fire, real skills!":
               "🎓 Kitchen Survival — College mode unlocked!"}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={()=>setPage("avatar")}
        disabled={!kidAge}
        style={{
          width:"100%",background:kidAge?"linear-gradient(135deg,#f97316,#fbbf24)":"rgba(255,255,255,0.1)",
          color:kidAge?"white":"rgba(255,255,255,0.3)",border:"none",borderRadius:20,
          padding:"18px 0",fontSize:17,fontWeight:800,cursor:kidAge?"pointer":"default",
          fontFamily:"'Syne',sans-serif",marginTop:20,
          boxShadow:kidAge?"0 6px 24px rgba(249,115,22,0.35)":"none",
        }}>
        Next → Pick Your Avatar!
      </button>
    </div>
  );

  // ── PAGE: AVATAR ─────────────────────────────────────────────
  if (page === "avatar") return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
      display:"flex",flexDirection:"column",padding:"32px 24px",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <style>{CSS_ONBOARD}</style>

      <button onClick={()=>setPage("age")} style={{background:"none",border:"none",cursor:"pointer",
        color:"rgba(255,255,255,0.5)",fontSize:14,fontWeight:600,textAlign:"left",marginBottom:20,padding:0}}>
        ← Back
      </button>

      <div style={{marginBottom:24}}>
        <div style={{fontSize:10,fontWeight:700,color:"#6b7280",letterSpacing:2,marginBottom:8}}>STEP 3 OF 4</div>
        <div style={{background:"rgba(255,255,255,0.1)",borderRadius:99,height:4,overflow:"hidden",marginBottom:20}}>
          <div style={{width:"75%",height:"100%",background:"linear-gradient(90deg,#f97316,#fbbf24)",borderRadius:99}}/>
        </div>
        <h2 className="font-syne" style={{fontSize:28,fontWeight:900,color:"white",margin:"0 0 4px",letterSpacing:-1}}>
          Pick your chef avatar!
        </h2>
        <p style={{color:"rgba(255,255,255,0.5)",fontSize:13}}>This is your identity in the kitchen 👀</p>
      </div>

      {/* Selected avatar preview */}
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{
          display:"inline-flex",flexDirection:"column",alignItems:"center",
          background:"rgba(255,255,255,0.06)",borderRadius:28,padding:"20px 32px",
          border:"2px solid rgba(255,255,255,0.12)",
        }}>
          <div style={{fontSize:72,lineHeight:1,animation:"zf 2.5s ease-in-out infinite",marginBottom:8}}>{avatar}</div>
          <div className="font-syne" style={{fontSize:16,fontWeight:800,color:"white"}}>{kidName}</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2}}>Age {kidAge}</div>
        </div>
      </div>

      {/* Avatar categories */}
      {[
        {label:"👑 Royals & Fantasy", slice:[0,8]},
        {label:"🦸 Heroes & Animals",  slice:[8,16]},
        {label:"👩‍🍳 Professionals",    slice:[16,24]},
        {label:"⚽ Sports & Fun",      slice:[24,32]},
      ].map(cat => (
        <div key={cat.label} style={{marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,0.4)",letterSpacing:1,marginBottom:6}}>{cat.label}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
            {AVATAR_ANIMALS.slice(...cat.slice).map(a=>(
              <button key={a} onClick={()=>setAvatar(a)} style={{
                background:avatar===a?"rgba(249,115,22,0.3)":"rgba(255,255,255,0.05)",
                border:`2px solid ${avatar===a?"#f97316":"rgba(255,255,255,0.1)"}`,
                borderRadius:14,padding:"10px 2px",cursor:"pointer",fontSize:22,
                transition:"all 0.15s",
                boxShadow:avatar===a?"0 0 14px rgba(249,115,22,0.4)":"none",
                transform:avatar===a?"scale(1.15)":"scale(1)",
              }}>{a}</button>
            ))}
          </div>
        </div>
      ))}

      {/* Food interests */}
      <p style={{color:"rgba(255,255,255,0.6)",fontSize:13,fontWeight:600,marginBottom:10}}>
        What do you love most? (pick all that apply!)
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:24}}>
        {FOOD_INTERESTS.map(f=>{
          const sel = interests.includes(f.id);
          return (
            <button key={f.id} onClick={()=>toggle(interests,setInterests,f.id)} style={{
              background:sel?"rgba(249,115,22,0.2)":"rgba(255,255,255,0.05)",
              border:`2px solid ${sel?"#f97316":"rgba(255,255,255,0.1)"}`,
              borderRadius:14,padding:"11px 12px",cursor:"pointer",
              display:"flex",alignItems:"center",gap:8,transition:"all 0.15s",
            }}>
              <span style={{fontSize:20}}>{f.icon}</span>
              <span style={{fontSize:12,fontWeight:700,color:sel?"#fbbf24":"rgba(255,255,255,0.6)"}}>{f.label}</span>
              {sel && <span style={{marginLeft:"auto",fontSize:14}}>✓</span>}
            </button>
          );
        })}
      </div>

      <button onClick={()=>setPage("chef")} style={{
        width:"100%",background:"linear-gradient(135deg,#f97316,#fbbf24)",
        color:"white",border:"none",borderRadius:20,padding:"18px 0",
        fontSize:17,fontWeight:800,cursor:"pointer",fontFamily:"'Syne',sans-serif",
        boxShadow:"0 6px 24px rgba(249,115,22,0.35)",
      }}>
        Next → Choose Your Chef!
      </button>
    </div>
  );

  // ── PAGE: CHEF PICK ──────────────────────────────────────────
  if (page === "chef") return (
    <div style={{minHeight:"100vh",background:"#fafaf9",
      display:"flex",flexDirection:"column",padding:"32px 24px",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes zf{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes zin{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%{transform:scale(0.5);opacity:0}70%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}
        @keyframes sizzle-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes sizzle-talk{0%{transform:scale(1)}100%{transform:scale(1.06)}}
        @keyframes zesty-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes zesty-talk{0%{transform:scale(1)}100%{transform:scale(1.04)}}
      `}</style>

      <button onClick={()=>setPage("avatar")} style={{background:"none",border:"none",cursor:"pointer",
        color:"#6b7280",fontSize:14,fontWeight:600,textAlign:"left",marginBottom:20,padding:0}}>
        ← Back
      </button>

      <div style={{marginBottom:24}}>
        <div style={{fontSize:10,fontWeight:700,color:"#9ca3af",letterSpacing:2,marginBottom:8}}>STEP 4 OF 4</div>
        <div style={{background:"#f5f5f4",borderRadius:99,height:4,overflow:"hidden",marginBottom:20}}>
          <div style={{width:"100%",height:"100%",background:"linear-gradient(90deg,#f97316,#fbbf24)",borderRadius:99}}/>
        </div>
        <h2 className="font-syne" style={{fontSize:28,fontWeight:900,color:"#1c1917",margin:"0 0 4px",letterSpacing:-1}}>
          Who's your chef?
        </h2>
        <p style={{color:"#6b7280",fontSize:13}}>Your guide through every recipe 👇</p>
      </div>

      <div style={{display:"flex",gap:14,flex:1,marginBottom:24}}>
        {/* Sizzle card */}
        {[
          {id:"sizzle", name:"Sizzle", vibe:"🔥 Bold & Street-smart", tags:["Loves spicy food","Hip & energetic","Never holds back"],
           bg:"linear-gradient(160deg,#1c1917,#292524)", accent:"#f97316", border:"#f97316"},
          {id:"zesty",  name:"Zesty",  vibe:"🍋 Sharp & Elegant",     tags:["World cuisine nerd","Cool under pressure","Loves precision"],
           bg:"linear-gradient(160deg,#052e16,#14532d)", accent:"#65a30d", border:"#65a30d"},
        ].map(c=>{
          const sel = chef===c.id;
          return (
            <div key={c.id} onClick={()=>setChef(c.id)} style={{
              flex:1, background:c.bg, borderRadius:24, padding:18, cursor:"pointer",
              border:`3px solid ${sel?c.accent:"rgba(255,255,255,0.1)"}`,
              transition:"all 0.3s", position:"relative", overflow:"hidden",
              boxShadow:sel?`0 12px 40px ${c.accent}55`:"0 4px 16px rgba(0,0,0,0.2)",
              transform:sel?"translateY(-4px)":"none",
            }}>
              {sel && (
                <div style={{position:"absolute",top:12,right:12,background:c.accent,
                  color:"white",borderRadius:10,padding:"4px 10px",fontSize:11,fontWeight:800}}>
                  ✓ My Chef!
                </div>
              )}
              <div style={{textAlign:"center",marginBottom:14}}>
                {c.id==="sizzle"
                  ? <SizzleMini mood={sel?"excited":"happy"} size={90}/>
                  : <Zesty mood={sel?"excited":"happy"} size={90}/>}
              </div>
              <div className="font-syne" style={{fontSize:22,fontWeight:900,color:"white",textAlign:"center",marginBottom:4}}>
                {c.name}
              </div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",textAlign:"center",fontWeight:600,marginBottom:12}}>
                {c.vibe}
              </div>
              {c.tags.map(t=>(
                <div key={t} style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:c.accent,flexShrink:0}}/>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontWeight:600}}>{t}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <button
        onClick={()=>{
          if(!chef) return;
          onComplete({kidName, kidAge, kidDiet: diet||"veg", chefChoice: chef, avatar, interests});
        }}
        disabled={!chef}
        style={{
          width:"100%",
          background:chef==="zesty"?"linear-gradient(135deg,#15803d,#65a30d)":
                     chef==="sizzle"?"linear-gradient(135deg,#f97316,#fbbf24)":
                     "#e5e7eb",
          color:chef?"white":"#9ca3af",border:"none",borderRadius:20,
          padding:"18px 0",fontSize:18,fontWeight:800,cursor:chef?"pointer":"default",
          fontFamily:"'Syne',sans-serif",
          boxShadow:chef?"0 8px 32px rgba(249,115,22,0.4)":"none",
          transition:"all 0.3s",
        }}>
        {chef?`🎉 Let's Cook, ${kidName}!`:"Pick your chef first!"}
      </button>
    </div>
  );

  // ── PAGE: DONE! ──────────────────────────────────────────────
  if (done) return (
    <div style={{minHeight:"100vh",background:"#0f0e0d",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",padding:28,textAlign:"center",
      fontFamily:"'DM Sans',system-ui,sans-serif",position:"relative",overflow:"hidden"}}>
      <style>{CSS_ONBOARD}</style>
      <FloatingFood items={["🎉","⭐","✨","🏆","🔥","🍋","👨‍🍳","🥭"]} count={20}/>

      <div style={{fontSize:80,animation:"zf 2s ease-in-out infinite",marginBottom:16}}>{avatar}</div>
      <h1 className="font-syne" style={{
        fontSize:40,fontWeight:900,margin:"0 0 8px",letterSpacing:-2,
        background:"linear-gradient(135deg,#f97316,#fbbf24)",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
      }}>
        Welcome, Chef {kidName}!
      </h1>
      <p style={{color:"rgba(255,255,255,0.6)",fontSize:15,marginBottom:8}}>
        Age {kidAge} · {chef==="zesty"?"Zesty 🍋":"Sizzle 🔥"} is your guide
      </p>
      {interests.length>0 && (
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:12,marginBottom:28}}>
          Into: {interests.map(i=>FOOD_INTERESTS.find(f=>f.id===i)?.icon).join(" ")}
        </p>
      )}

      <div style={{background:"rgba(255,255,255,0.06)",borderRadius:20,padding:"16px 24px",
        marginBottom:28,border:"1.5px solid rgba(255,255,255,0.1)"}}>
        <div style={{display:"flex",gap:20,justifyContent:"center"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:24,fontWeight:900,color:"#f97316",fontFamily:"'Syne',sans-serif"}}>50+</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:700}}>SOLO RECIPES</div>
          </div>
          <div style={{width:1,background:"rgba(255,255,255,0.1)"}}/>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:24,fontWeight:900,color:"#fbbf24",fontFamily:"'Syne',sans-serif"}}>25</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:700}}>TEAM RECIPES</div>
          </div>
          <div style={{width:1,background:"rgba(255,255,255,0.1)"}}/>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:24,fontWeight:900,color:"#65a30d",fontFamily:"'Syne',sans-serif"}}>15</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:700}}>PARENT RECIPES</div>
          </div>
        </div>
      </div>

      <button onClick={()=>onComplete({kidName, kidAge, kidDiet: diet||"veg", chefChoice: chef, avatar, interests})} style={{
        width:"100%",maxWidth:300,
        background:"linear-gradient(135deg,#f97316,#fbbf24)",
        color:"white",border:"none",borderRadius:20,padding:"18px 0",
        fontSize:18,fontWeight:800,cursor:"pointer",fontFamily:"'Syne',sans-serif",
        boxShadow:"0 8px 32px rgba(249,115,22,0.45)",
      }}>
        🍳 Start My First Recipe!
      </button>
    </div>
  );
}

// ─── Minimal Sizzle for chef picker ───────────────────────────
function SizzleMini({ mood="happy", size=90 }) {
  const mouths = { happy:"M 43 67 Q 50 75 57 67", excited:"M 41 65 Q 50 79 59 65" };
  return (
    <svg width={size} height={size*1.22} viewBox="0 0 100 122"
      style={{filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.3))",
              animation:"sizzle-float 2.8s ease-in-out infinite",display:"block",margin:"0 auto"}}>
      <defs>
        <linearGradient id="sfFG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B35"/><stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="30" rx="27" ry="10" fill="#1c1917"/>
      <rect x="29" y="11" width="42" height="22" rx="9" fill="#1c1917"/>
      <ellipse cx="50" cy="11" rx="15" ry="9" fill="#1c1917"/>
      <rect x="29" y="30" width="42" height="6" rx="3" fill="url(#sfFG)"/>
      <circle cx="50" cy="55" r="23" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5"/>
      <circle cx="50" cy="55" r="21.5" fill="#FEF3C7"/>
      {mood==="excited"
        ? <><circle cx="43" cy="52" r="5.5" fill="white" stroke="#1c1917" strokeWidth="1.5"/><circle cx="57" cy="52" r="5.5" fill="white" stroke="#1c1917" strokeWidth="1.5"/><circle cx="44.5" cy="53" r="2.5" fill="#1c1917"/><circle cx="58.5" cy="53" r="2.5" fill="#1c1917"/></>
        : <><path d="M 39 52 Q 43 47 47 52" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M 53 52 Q 57 47 61 52" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round"/></>}
      <circle cx="36" cy="60" r="6" fill="#FCA5A5" opacity="0.5"/>
      <circle cx="64" cy="60" r="6" fill="#FCA5A5" opacity="0.5"/>
      <path d={mouths[mood]||mouths.happy} stroke="#78350f" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <rect x="27" y="77" width="46" height="34" rx="11" fill="#292524"/>
      <rect x="33" y="77" width="34" height="34" rx="7" fill="white" opacity="0.94"/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// 📋 RECIPE EXPLORER — shows all 3 tiers with filtering
// ═══════════════════════════════════════════════════════════════

function Home({ profile, onRecipe, onSpecial, onBrowse }) {
  const { kidName, kidAge, kidDiet, chefChoice } = profile;
  const Chef   = chefChoice==="zesty" ? Zesty : Sizzle;
  const accent = chefChoice==="zesty" ? "#65a30d" : "#f97316";
  const isCollege = parseInt(kidAge)>=16 || kidAge==="18+";
  const myRecs = RECIPES.filter(r=>r.section==="kids"&&(kidDiet==="both"||r.diet===kidDiet||r.diet==="veg"));

  return (
    <div style={{paddingBottom:20}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(135deg,#1c1917,${accent})`,padding:"22px 18px 32px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-50,right:-50,width:160,height:160,background:"rgba(255,255,255,0.06)",borderRadius:"50%"}}/>
        <div style={{position:"absolute",bottom:-30,left:-30,width:120,height:120,background:"rgba(255,255,255,0.04)",borderRadius:"50%"}}/>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <Chef mood="happy" size={74}/>
          <div>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:500}}>Hey chef-in-training!</div>
            <div style={{color:"white",fontSize:26,fontWeight:900,letterSpacing:-0.5}}>{kidName}! 🔥</div>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:12,marginTop:2}}>
              {chefChoice==="zesty"?`"Zest it up today! 🍋"`:`"Let's get sizzling! 🍳"`}
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:"0 14px"}}>
        {/* Power Levels — clicking goes to Browse pre-filtered */}
        <div style={{marginTop:20}}>
          <div style={{fontWeight:800,fontSize:15,color:"#1c1917",marginBottom:10}}>⚡ Choose Your Power Level</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {Object.values(LEVELS).filter(l=>l.id!=="survival"||isCollege).map(lv=>{
              const ct = RECIPES.filter(r=>r.level===lv.id&&!r.section.startsWith("special")).length;
              return (
                <div key={lv.id}
                  onClick={()=>onBrowse(lv.id)}
                  style={{background:lv.bg,border:`2px solid ${lv.border}`,borderRadius:16,padding:"13px 14px",cursor:"pointer",boxShadow:lv.glow,transition:"transform 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                  onMouseLeave={e=>e.currentTarget.style.transform=""}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <span style={{fontSize:24}}>{lv.icon}</span>
                    <span style={{background:lv.color,color:"white",borderRadius:8,padding:"2px 8px",fontSize:10,fontWeight:700}}>{ct} recipes</span>
                  </div>
                  <div style={{fontWeight:900,fontSize:14,color:"#1c1917"}}>{lv.name}</div>
                  <div style={{fontSize:10,color:"#6b7280",marginTop:2,fontWeight:600}}>{lv.tagline}</div>
                  <div style={{fontSize:9,color:lv.color,marginTop:4,fontWeight:700}}>Tap to browse →</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specials */}
        <Row title="🌟 Specials Corner">
          <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:6}}>
            {SPECIALS.map(s=>(
              <div key={s.id} onClick={()=>onSpecial(s)}
                style={{minWidth:116,background:s.color,borderRadius:16,padding:"13px 10px",cursor:"pointer",flexShrink:0,textAlign:"center",boxShadow:`0 4px 14px ${s.color}55`}}>
                <div style={{fontSize:28,marginBottom:4}}>{s.icon}</div>
                <div style={{color:"white",fontWeight:800,fontSize:11,lineHeight:1.3}}>{s.title}</div>
              </div>
            ))}
          </div>
        </Row>

        {/* Starter picks */}
        <Row title="⭐ Starter — Solo Chef Mode">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            {myRecs.filter(r=>r.level==="starter").slice(0,4).map(r=><RCard key={r.id} r={r} onTap={()=>onRecipe(r)}/>)}
          </div>
        </Row>

        {/* Explorer picks */}
        <Row title="🔥 Explorer — Buddy Cook Mode">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            {myRecs.filter(r=>r.level==="explorer").slice(0,4).map(r=><RCard key={r.id} r={r} onTap={()=>onRecipe(r)}/>)}
          </div>
        </Row>

        {/* Chef Boss picks */}
        <Row title="👑 Chef Boss — Adult On Deck">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            {myRecs.filter(r=>r.level==="boss").slice(0,4).map(r=><RCard key={r.id} r={r} onTap={()=>onRecipe(r)}/>)}
          </div>
        </Row>

        {/* Regional — clicking opens Browse filtered by cuisine */}
        <Row title="🗺️ Cook India's Regions!">
          <div style={{display:"flex",gap:9,overflowX:"auto",paddingBottom:6}}>
            {[{c:"No-Cook",e:"❄️"},{c:"Street Food",e:"🌶️"},{c:"South Indian",e:"🥥"},{c:"North Indian",e:"🫓"},{c:"Gujarati",e:"🟡"},{c:"Pan-India",e:"🇮🇳"},{c:"Western",e:"🍕"}].map(({c,e})=>(
              <div key={c} onClick={()=>onBrowse("all",c)}
                style={{minWidth:84,background:"white",borderRadius:14,padding:"11px 7px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",cursor:"pointer",flexShrink:0,border:"2px solid transparent",transition:"border-color 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=accent}
                onMouseLeave={e=>e.currentTarget.style.borderColor="transparent"}>
                <div style={{fontSize:22}}>{e}</div>
                <div style={{fontSize:10,fontWeight:700,color:"#374151",marginTop:4,lineHeight:1.3}}>{c}</div>
              </div>
            ))}
          </div>
        </Row>

        {isCollege && (
          <Row title="🎓 Kitchen Survival Mode">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
              {RECIPES.filter(r=>r.level==="survival").slice(0,4).map(r=><RCard key={r.id} r={r} onTap={()=>onRecipe(r)}/>)}
            </div>
          </Row>
        )}
      </div>
    </div>
  );
}

function Row({title,children}){ return <div style={{marginTop:20}}><div style={{fontWeight:800,fontSize:15,color:"#1c1917",marginBottom:9}}>{title}</div>{children}</div>; }

function RCard({ r, onTap }) {
  const lv = LEVELS[r.level]||LEVELS.starter;
  return (
    <div onClick={onTap} style={{background:"white",borderRadius:14,padding:12,boxShadow:"0 2px 10px rgba(0,0,0,0.06)",cursor:"pointer",border:`2px solid ${lv.border}`,transition:"transform 0.15s,box-shadow 0.15s"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 18px rgba(0,0,0,0.1)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 10px rgba(0,0,0,0.06)";}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
        <span style={{fontSize:32}}>{r.emoji}</span>
        <span style={{background:lv.color,color:"white",borderRadius:8,padding:"2px 7px",fontSize:9,fontWeight:700}}>{lv.icon} {lv.name}</span>
      </div>
      <div style={{fontSize:13,fontWeight:800,color:"#1c1917",marginBottom:1,lineHeight:1.3}}>{r.name}</div>
      <div style={{fontSize:10,color:"#a8a29e",marginBottom:6}}>{r.hindi} · {r.time}</div>
      <span style={{background:r.diet==="veg"?"#dcfce7":"#fee2e2",color:r.diet==="veg"?"#166534":"#991b1b",borderRadius:8,padding:"2px 7px",fontSize:9,fontWeight:700}}>{r.diet==="veg"?"🌿 Veg":"🍗 Non-Veg"}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🔍  BROWSER
// ═══════════════════════════════════════════════════════════════
function Browser({ onRecipe, initLevel="all", initCuisine="all" }) {
  const [lv, setLv]   = useState(initLevel);
  const [dt, setDt]   = useState("all");
  const [cu, setCu]   = useState(initCuisine);
  const [q,  setQ]    = useState("");
  const out = RECIPES.filter(r=>{
    if(lv!=="all" && r.level!==lv) return false;
    if(dt!=="all" && r.diet!==dt) return false;
    if(cu!=="all"){
      if(cu==="No-Cook" && !r.tags?.includes("no-cook")) return false;
      else if(cu==="Street Food" && !r.tags?.includes("chaat")) return false;
      else if(cu!=="No-Cook" && cu!=="Street Food" && r.cuisine!==cu && !r.cuisine?.includes(cu)) return false;
    }
    if(q && !r.name.toLowerCase().includes(q.toLowerCase()) && !(r.hindi||"").includes(q)) return false;
    return true;
  });
  return (
    <div style={{padding:14}}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍 Search any recipe..."
        style={{...INP,background:"white",marginBottom:10}}/>
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:6,marginBottom:6}}>
        <Chip label="All Levels" a={lv==="all"} onClick={()=>setLv("all")}/>
        {Object.values(LEVELS).map(l=><Chip key={l.id} label={`${l.icon} ${l.name}`} a={lv===l.id} color={l.color} onClick={()=>setLv(l.id)}/>)}
      </div>
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:6,marginBottom:6}}>
        {[["all","All 🍽️"],["veg","🌿 Veg"],["non-veg","🍗 Non-Veg"]].map(([v,l])=><Chip key={v} label={l} a={dt===v} onClick={()=>setDt(v)}/>)}
      </div>
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:10}}>
        {["All","No-Cook","Street Food","South Indian","North Indian","Gujarati","Pan-India","Western","Mumbai"].map(c=><Chip key={c} label={c} a={cu===(c==="All"?"all":c)} onClick={()=>setCu(c==="All"?"all":c)}/>)}
      </div>
      <div style={{fontSize:12,color:"#a8a29e",marginBottom:10}}>{out.length} recipes found</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
        {out.map(r=><RCard key={r.id} r={r} onTap={()=>onRecipe(r)}/>)}
      </div>
      {!out.length && <div style={{textAlign:"center",padding:40,color:"#a8a29e"}}><div style={{fontSize:40}}>🔍</div><div style={{fontWeight:600,marginTop:8}}>No recipes found — try a different filter!</div></div>}
    </div>
  );
}
function Chip({label,a,onClick,color="#f97316"}){ return <button onClick={onClick} style={{background:a?color:"white",color:a?"white":"#6b7280",border:`2px solid ${a?color:"#e5e7eb"}`,borderRadius:18,padding:"6px 12px",fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s"}}>{label}</button>; }

// ═══════════════════════════════════════════════════════════════
// 🌟  SPECIALS SCREEN
// ═══════════════════════════════════════════════════════════════
function SpecialScreen({ special, onRecipe, onBack }) {
  const recs = RECIPES.filter(r=>special.recipeIds.includes(r.id));
  return (
    <div style={{padding:14}}>
      <button onClick={onBack} style={BK}>← Back</button>
      <div style={{background:special.color,borderRadius:22,padding:24,marginBottom:18,textAlign:"center",boxShadow:`0 6px 24px ${special.color}55`}}>
        <div style={{fontSize:54,marginBottom:8}}>{special.icon}</div>
        <h2 style={{color:"white",fontSize:22,fontWeight:900,margin:"0 0 4px"}}>{special.title}</h2>
        <p style={{color:"rgba(255,255,255,0.88)",fontSize:13,margin:0}}>{special.sub}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {recs.map(r=><RCard key={r.id} r={r} onTap={()=>onRecipe(r)}/>)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 🍳  COOK ALONG
// ═══════════════════════════════════════════════════════════════
function RecipeExplorer() {
  const [tier, setTier]     = useState("solo");
  const [search, setSearch] = useState("");
  const [tag, setTag]       = useState("all");

  const recipes = tier==="solo" ? SOLO_RECIPES : tier==="team" ? TEAM_RECIPES : PARENT_RECIPES;
  const allTags = ["all", ...new Set(recipes.flatMap(r=>r.tags))];
  const filtered = recipes.filter(r =>
    (tag==="all" || r.tags.includes(tag)) &&
    (!search || r.name.toLowerCase().includes(search.toLowerCase()) || r.region.toLowerCase().includes(search.toLowerCase()))
  );

  const tierConfig = {
    solo:   { label:"⭐ Solo Chef",    color:"#16a34a", desc:"Kid does it ALL — no flame, no knife, no heat. 140+ recipes from India + around the world.", bg:"#dcfce7", count:SOLO_RECIPES.length },
    team:   { label:"🔥 Team Cook",    color:"#f97316", desc:"Kid + grown-up together — kid does most steps. 25 recipes.", bg:"#fff7ed", count:25 },
    parent: { label:"👑 Parent Leads", color:"#7c3aed", desc:"Parent cooks, kid has their specific starring role. 15 recipes.", bg:"#f5f3ff", count:15 },
  };

  const tc = tierConfig[tier];

  return (
    <div style={{minHeight:"100vh",background:"#fafaf9",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#1c1917,#292524)",padding:"20px 18px 24px",position:"sticky",top:0,zIndex:10}}>
        <h2 className="font-syne" style={{fontSize:22,fontWeight:900,color:"white",margin:"0 0 12px",letterSpacing:-0.5}}>
          🌍 Recipe Explorer
        </h2>
        {/* Tier tabs */}
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          {Object.entries(tierConfig).map(([id,t])=>(
            <button key={id} onClick={()=>{setTier(id);setTag("all");setSearch("");}}
              style={{flex:1,background:tier===id?t.color:"rgba(255,255,255,0.08)",
                color:tier===id?"white":"rgba(255,255,255,0.5)",
                border:`2px solid ${tier===id?t.color:"rgba(255,255,255,0.1)"}`,
                borderRadius:14,padding:"8px 4px",fontSize:11,fontWeight:800,cursor:"pointer",
                transition:"all 0.2s",lineHeight:1.3}}>
              {t.label.split(" ").slice(0,2).join(" ")}<br/>
              <span style={{fontSize:9,opacity:0.8}}>{t.count} recipes</span>
            </button>
          ))}
        </div>
        {/* Search */}
        <div style={{position:"relative"}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,opacity:0.5}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder={`Search ${tc.count} recipes...`}
            style={{width:"100%",padding:"10px 12px 10px 36px",borderRadius:14,border:"none",
              background:"rgba(255,255,255,0.1)",color:"white",fontSize:13,outline:"none",
              fontFamily:"inherit","::placeholder":{color:"rgba(255,255,255,0.4)"}}}/>
        </div>
      </div>

      {/* Tier info banner */}
      <div style={{background:tc.bg,borderBottom:`3px solid ${tc.color}22`,padding:"10px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:tc.color,flexShrink:0}}/>
        <p style={{fontSize:12,color:tc.color,fontWeight:700,margin:0}}>{tc.desc}</p>
      </div>

      {/* Tag filters — curated for solo tier, auto-generated for others */}
      <div style={{padding:"10px 14px 0",display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
        {(tier==="solo"
          ? ["all","indian","chaat","drink","sweet","snack","lunch","breakfast","healthy","build","global","salad","rice","fun"]
          : allTags.slice(0,14)
        ).map(t=>(
          <button key={t} onClick={()=>setTag(t)} style={{
            background:tag===t?tc.color:"white",color:tag===t?"white":"#6b7280",
            border:`1.5px solid ${tag===t?tc.color:"#e5e7eb"}`,
            borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",
            whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s",
          }}>
            {t==="all"?"🌍 All":t==="indian"?"🇮🇳 Indian":t==="chaat"?"🌶️ Chaat":t==="build"?"🎉 Build-Your-Own":t==="drink"?"🧃 Drinks":t==="sweet"?"🍬 Sweets":t==="snack"?"🥨 Snacks":t==="lunch"?"🥗 Lunch":t==="breakfast"?"☀️ Breakfast":t==="healthy"?"💚 Healthy":t==="global"?"✈️ Global":t==="salad"?"🥗 Salads":t==="rice"?"🍚 Rice":t==="fun"?"🎊 Fun":t}
          </button>
        ))}
      </div>

      <div style={{padding:"10px 14px 4px",fontSize:11,color:"#9ca3af",fontWeight:600}}>
        {filtered.length} recipe{filtered.length!==1?"s":""} found
      </div>

      {/* Recipe cards */}
      <div style={{padding:"0 14px 90px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {filtered.map((r,i)=>(
          <div key={r.id} style={{
            background:"white",borderRadius:18,padding:14,
            boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
            border:`1.5px solid ${tc.color}22`,
            animation:`fadeUp 0.4s ease-out ${i*0.04}s both`,
            cursor:"pointer",
          }}>
            <div style={{fontSize:36,marginBottom:6,lineHeight:1}}>{r.emoji}</div>
            <div style={{fontWeight:900,fontSize:13,color:"#1c1917",marginBottom:2,lineHeight:1.3}}>{r.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:6}}>
              <span style={{fontSize:9,color:"#9ca3af",fontWeight:700}}>🌍</span>
              <span style={{fontSize:10,color:"#9ca3af",fontWeight:700}}>{r.region}</span>
              <span style={{fontSize:9,color:"#d1d5db"}}>·</span>
              <span style={{fontSize:10,color:tc.color,fontWeight:800}}>⏱ {r.time}</span>
            </div>
            <p style={{fontSize:11,color:"#6b7280",margin:"0 0 8px",lineHeight:1.5}}>{r.desc}</p>
            {tier==="parent" && (
              <div style={{background:`${tc.color}15`,borderRadius:8,padding:"6px 8px"}}>
                <div style={{fontSize:9,fontWeight:800,color:tc.color,marginBottom:2}}>👶 KID'S JOB:</div>
                <div style={{fontSize:10,color:"#6b7280",fontWeight:600}}>{r.kidJob}</div>
              </div>
            )}
            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:6}}>
              {r.tags.slice(0,2).map(t=>(
                <span key={t} style={{background:`${tc.color}15`,color:tc.color,borderRadius:6,
                  padding:"2px 7px",fontSize:9,fontWeight:800}}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen,  setScreen]  = useState("onboard");
  const [tab,     setTab]     = useState("home");
  const [profile, setProfile] = useState(null);
  const [recipe,  setRecipe]  = useState(null);
  const [special, setSpecial] = useState(null);
  const [browseFilter, setBrowseFilter] = useState({level:"all", cuisine:"all"});
  const accent = profile?.chefChoice==="zesty" ? "#65a30d" : "#f97316";

  const handleBrowse = (level="all", cuisine="all") => {
    setBrowseFilter({level, cuisine});
    setTab("browse");
  };

  const showNav = !recipe && !special;

  return (
    <div style={{minHeight:"100vh",background:"#fafaf9",fontFamily:"'Segoe UI',system-ui,sans-serif",maxWidth:520,margin:"0 auto"}}>
      <style>{`
        @keyframes sizzle-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes sizzle-talk{0%{transform:scale(1)}100%{transform:scale(1.06)}}
        *{box-sizing:border-box}
      `}</style>

      {screen==="onboard" ? <Onboarding onComplete={p=>{setProfile(p);setScreen("main");}}/> : (
        <>
          {showNav && (
            <div style={{background:accent,padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:20,boxShadow:"0 2px 16px rgba(0,0,0,0.2)"}}>
              <div style={{color:"white",fontWeight:900,fontSize:16}}>
                {profile?.chefChoice==="zesty" ? "Zesty 🍋" : "Sizzle 🔥"}
              </div>
              <div style={{color:"rgba(255,255,255,0.9)",fontWeight:600,fontSize:13}}>Hi {profile?.kidName}! 👋</div>
            </div>
          )}

          <div style={{minHeight:"calc(100vh - 58px)",overflowY:"auto"}}>
            {recipe
              ? <CookAlong recipe={recipe} profile={profile} onBack={()=>setRecipe(null)}/>
              : special
                ? <SpecialScreen special={special} onRecipe={r=>{setRecipe(r);setSpecial(null);}} onBack={()=>setSpecial(null)}/>
                : tab==="home"
                  ? <Home profile={profile} onRecipe={setRecipe} onSpecial={setSpecial} onBrowse={handleBrowse}/>
                  : tab==="browse"
                    ? <Browser onRecipe={setRecipe} initLevel={browseFilter.level} initCuisine={browseFilter.cuisine}/>
                    : tab==="specials"
                      ? (
                        <div style={{padding:14}}>
                          <div style={{fontWeight:800,fontSize:16,color:"#1c1917",marginBottom:14}}>🌟 Specials Corner</div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                            {SPECIALS.map(s=>(
                              <div key={s.id} onClick={()=>setSpecial(s)} style={{background:s.color,borderRadius:16,padding:18,cursor:"pointer",textAlign:"center",boxShadow:`0 5px 16px ${s.color}55`}}>
                                <div style={{fontSize:36,marginBottom:6}}>{s.icon}</div>
                                <div style={{color:"white",fontWeight:800,fontSize:12}}>{s.title}</div>
                                <div style={{color:"rgba(255,255,255,0.8)",fontSize:10,marginTop:3}}>{s.sub}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                      : tab==="quest"   ? <QuestScreen/>
                      : tab==="fridge"  ? <FridgeScreen/>
                      : tab==="quick"   ? <QuickScreen/>
                      : tab==="memory"  ? <MemoryBook/>
                      : tab==="recipes" ? <RecipeExplorer/>
                      : tab==="me"
                        ? (
                          <div style={{padding:20,textAlign:"center"}}>
                            <div style={CARD}>
                              {profile?.chefChoice==="zesty"?<Zesty mood="happy" size={100}/>:<Sizzle mood="happy" size={100}/>}
                              <h2 style={{fontSize:22,fontWeight:900,color:"#1c1917",margin:"12px 0 3px"}}>{profile?.kidName}</h2>
                              <p style={{color:"#a8a29e",fontSize:13,marginBottom:16}}>Age {profile?.kidAge} · Chef Guide: {profile?.chefChoice==="zesty"?"Zesty 🍋":"Sizzle 🔥"}</p>
                              <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
                                <button onClick={()=>setTab("quest")}  style={{background:"#f5f3ff",border:"1.5px solid #a855f7",color:"#7c3aed",borderRadius:12,padding:"8px 14px",fontSize:12,fontWeight:800,cursor:"pointer"}}>⚔️ Quest</button>
                                <button onClick={()=>setTab("memory")} style={{background:"#fdf2f8",border:"1.5px solid #ec4899",color:"#db2777",borderRadius:12,padding:"8px 14px",fontSize:12,fontWeight:800,cursor:"pointer"}}>📸 Memory Book</button>
                              </div>
                              <div style={{marginBottom:16}}>
                                {Object.values(LEVELS).map(lv=>(
                                  <div key={lv.id} style={{display:"flex",gap:10,alignItems:"center",marginBottom:8,background:lv.bg,borderRadius:12,padding:"9px 12px",border:`1.5px solid ${lv.border}`,textAlign:"left"}}>
                                    <span style={{fontSize:20}}>{lv.icon}</span>
                                    <div><div style={{fontWeight:700,fontSize:12,color:lv.color}}>{lv.name} · {lv.tagline}</div><div style={{fontSize:11,color:"#6b7280"}}>{lv.desc}</div></div>
                                  </div>
                                ))}
                              </div>
                              <button onClick={()=>{setProfile(null);setScreen("onboard");}} style={{...BTN,background:"#f5f5f4",color:"#57534e",fontSize:13}}>Switch Profile / Sign Out</button>
                            </div>
                          </div>
                        )
                        : null
            }
          </div>

          {/* Bottom nav */}
          {showNav && (
            <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:520,background:"white",borderTop:"1.5px solid #f5f5f4",display:"flex",zIndex:20,boxShadow:"0 -4px 24px rgba(0,0,0,0.08)"}}>
              {[
                ["home",   "🏠","Home"],
                ["browse", "🔍","Recipes"],
                ["quick",  "⚡","30-Min"],
                ["fridge", "🧊","Fridge"],
                ["quest",  "⚔️","Quest"],
                ["memory", "📸","Memory"],
                ["me",     "👤","Me"],
              ].map(([id,ic,lb])=>(
                <button key={id} onClick={()=>setTab(id)} style={{flex:1,background:"none",border:"none",padding:"10px 0 8px",cursor:"pointer",color:tab===id?accent:"#a8a29e",transition:"color 0.2s"}}>
                  <div style={{fontSize:18}}>{ic}</div>
                  <div style={{fontSize:9,fontWeight:tab===id?800:400,marginTop:1}}>{lb}</div>
                </button>
              ))}
            </div>
          )}
          {showNav && <div style={{height:68}}/>}
        </>
      )}
    </div>
  );
}


// ─── end of file ──────────────────────────────────────────────
