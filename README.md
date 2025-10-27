# convex-ents-cascade-test

This is a demo of different types of cascade deletes, and how to keep them one-directional.

## Running

To install dependencies:

```bash
bun install
```

To run:

```bash
bunx convex dev
```

Follow the steps to set up the project (choose new — or create one manually from the Convex dashboard and choose it).

## Experimenting with the behavior

The repo illustrates how to implement one-directional cascade deletes for three table configurations:
1. primary table + secondary table referencing the primary table + hard delete with `convex-ents`
2. primary table referencing the secondary table + the secondary table + soft delete with `convex-ents`
2. primary table referencing the secondary table + the secondary table + hard delete (without `convex-ents`)

Then open the project dashboard → Functions and try creating and deleting records:
- When the secondary table has a foreign key (`cat_ages_1.cat_1_id` → `cats_1._id`)
  - `createCat1` → `deleteCat1` (should hard-delete the record in `cats_1` and the record in `cat_ages_1`)
  - `createCat1` → `deleteCat1Age` (should hard-delete the record in `cat_ages_1` but not the record in `cats_1`)
- When the primary table has a reference to the secondary table (`cats_2.cat_age_2_id` → `cat_ages_2._id`)
  - `createCat2` → `deleteCat2` (should soft-delete the record in `cats_2` and the record in `cat_ages_2`)
  - `createCat2` → `deleteCat2Age` (should soft-delete the record in `cat_ages_2` but not the record in `cats_2`)
- When the primary table has a reference to the secondary table (`cats_3.cat_age_3_id` → `cat_ages_3._id`)
  - `createCat2` → `deleteCat2` (should hard-delete the record in `cats_3` and the record in `cat_ages_3`)
  - `createCat2` → `deleteCat2Age` (should hard-delete the record in `cat_ages_3` but not the record in `cats_3`)
