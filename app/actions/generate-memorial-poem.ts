"use server"

export async function generateMemorialPoem(formData: FormData) {
  const name = formData.get("name") as string
  const style = (formData.get("style") as string) || "free-verse"
  const theme = (formData.get("theme") as string) || "remembrance"

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const poems = {
    "free-verse": {
      remembrance: `In Memory of ${name}

Your laughter echoes in the wind,
Your smile lives on in every sunset,
Your love remains in every heart you touched.

Though you have journeyed beyond our sight,
Your spirit dances in the morning light,
Your wisdom whispers in the quiet moments,
Your kindness blooms in acts of love.

We carry you with us always,
In stories shared and tears of joy,
In the lessons you taught us,
In the love you gave so freely.

${name}, you are not gone,
You are woven into the fabric of our lives,
Forever cherished, forever remembered,
Forever loved.`,
      celebration: `A Celebration of ${name}

What a beautiful life you lived,
Full of laughter, love, and light.
You painted the world brighter
With your presence, your joy, your might.

Every day was an adventure,
Every moment a gift you gave.
Your enthusiasm was contagious,
Your spirit bold and brave.

We celebrate the memories,
The times we shared together.
Your legacy of happiness
Will last us now and forever.

Dance on, dear ${name},
In fields of endless spring.
Your celebration of life
Makes all our hearts sing.`,
    },
    rhyming: {
      remembrance: `In Loving Memory of ${name}

A gentle soul has gone to rest,
Among the angels, with the blessed.
Your memory lives within our hearts,
Though from this world you had to part.

The love you shared, the joy you brought,
The precious lessons that you taught,
Will guide us through each passing day,
And light our path along the way.

Though tears may fall and hearts may ache,
We know this is not a mistake.
For God has called you home to stay,
Until we meet again someday.

Rest in peace, dear ${name},
Your love will always be the same.
In our hearts you'll always be,
A treasured part of our family.`,
      celebration: `Celebrating ${name}

A life so full, a heart so true,
There was no one quite like you.
With every smile and every laugh,
You gave us joy on your behalf.

You lived each day with purpose clear,
Spreading love to all held dear.
Your kindness touched so many lives,
Your memory forever thrives.

We'll not say goodbye with tears,
But celebrate your precious years.
For in our hearts you'll always stay,
Brightening each and every day.

Thank you, ${name}, for all you gave,
Your love will follow past the grave.
In every sunset, every dawn,
Your beautiful spirit carries on.`,
    },
  }

  const stylePoems = poems[style as keyof typeof poems] || poems["free-verse"]
  const poem = stylePoems[theme as keyof typeof stylePoems] || stylePoems["remembrance"]

  return {
    success: true,
    poem: poem,
  }
}
