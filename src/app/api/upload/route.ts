import { connectToDb, deleteFile, fileExists } from "@/utils/mongo";
import { Readable } from "stream";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { bucket } = await connectToDb();
  // get the form data
  const data = await req.formData();

  // map through all the entries
  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;
    // FormDataEntryValue can either be type `Blob` or `string`
    // if its type is object then it's a Blob
    const isFile = typeof value == "object";
    if (isFile) {
      const blob = value as File;
      const filename = blob.name;

      const existing = await fileExists(filename);
      if (existing) {
        // If file already exists, let's skip it.
        // If you want a different behavior such as override, modify this part.

        await deleteFile(filename);
      }

      //conver the blob to stream
      const buffer = Buffer.from(await blob.arrayBuffer());
      // // Use sharp to compress the image before uploading
      // const compressedBuffer = await sharp(buffer)
      //   .resize(600, null) // Adjust the dimensions as needed
      //   .jpeg({ mozjpeg: true })
      //   .toBuffer();

      const stream = Readable.from(buffer);

      const uploadStream = await bucket.openUploadStream(filename, {
        // make sure to add content type so that it will be easier to set later.

        contentType: blob.type,
        metadata: {}, //add your metadata here if any
      });

      // pipe the readable stream to a writeable stream to save it to the database
      await stream.pipe(uploadStream);
    }
  }

  // return the response after all the entries have been processed.
  return NextResponse.json({ success: true });
}

// import { writeFile } from "fs/promises";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const data = await req.formData();
//   const file = data.get("file");

//   if (!file) {
//     return NextResponse.json(
//       { message: "no image found" },
//       {
//         status: 500,
//       }
//     );
//   }

//   let byteData: ArrayBuffer;

//   if (file instanceof Blob) {
//     // Check if it's a Blob (which includes File)
//     const arrayBuffer = await new Response(file).arrayBuffer();
//     byteData = arrayBuffer;
//   } else {
//     // Handle other cases if needed
//     return NextResponse.json(
//       {
//         message: "unsupported file type",
//       },
//       {
//         status: 500,
//       }
//     );
//   }

//   const buffer = Buffer.from(byteData);
//   const path = `./public/upload${file.name}`;

//   await writeFile(path, buffer);

//   return NextResponse.json(
//     {
//       message: "file uploaded.",
//     },
//     {
//       status: 200,
//     }
//   );
// }
