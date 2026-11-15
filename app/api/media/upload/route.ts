import { NextRequest, NextResponse } from "next/server";

export interface UploadedAssetResponse {
  id: string;
  fileName: string;
  assetType: "video" | "image" | "audio_voice" | "audio_music" | "audio_sfx";
  assetRole: string;
  fileSizeBytes: number;
  sizeFormatted: string;
  previewUrl: string;
  label: string;
  aiPromptDirective?: string;
  targetSceneOrder?: number;
  duration?: string;
  dimensions?: string;
  createdAt: string;
}

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const role = (formData.get("role") as string) || "reference_image";
      const label = (formData.get("label") as string) || file?.name || "Uploaded Asset";
      const directive = (formData.get("directive") as string) || "";
      const sceneOrder = formData.get("sceneOrder") ? parseInt(formData.get("sceneOrder") as string, 10) : undefined;

      if (!file) {
        return NextResponse.json({ error: "No file provided in form data" }, { status: 400 });
      }

      const fileBuffer = await file.arrayBuffer();
      const fileSize = fileBuffer.byteLength;
      const mime = file.type;

      let assetType: "video" | "image" | "audio_voice" = "image";
      if (mime.startsWith("video/")) {
        assetType = "video";
      } else if (mime.startsWith("audio/")) {
        assetType = "audio_voice";
      }

      const assetId = "ast_" + Math.random().toString(36).substring(2, 10);
      
      const previewUrl = "/api/media/preview/" + assetId;

      const responseAsset: UploadedAssetResponse = {
        id: assetId,
        fileName: file.name,
        assetType,
        assetRole: role,
        fileSizeBytes: fileSize,
        sizeFormatted: formatBytes(fileSize),
        previewUrl,
        label,
        aiPromptDirective: directive,
        targetSceneOrder: sceneOrder,
        duration: assetType === "video" ? "~6.5s" : assetType === "audio_voice" ? "~4.0s" : undefined,
        dimensions: assetType === "video" ? "1080x1920" : assetType === "image" ? "1024x1024" : undefined,
        createdAt: new Date().toISOString(),
      };

      return NextResponse.json({
        status: "SUCCESS",
        asset: responseAsset,
      });
    }

    // JSON payload support (e.g. metadata or client-side processed files)
    const body = await req.json();
    const assetId = "ast_" + Math.random().toString(36).substring(2, 10);
    const size = body.fileSizeBytes || 1024 * 1024 * 2;

    const responseAsset: UploadedAssetResponse = {
      id: assetId,
      fileName: body.fileName || "reference_file",
      assetType: body.assetType || "image",
      assetRole: body.assetRole || "reference_image",
      fileSizeBytes: size,
      sizeFormatted: formatBytes(size),
      previewUrl: body.previewUrl || "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80",
      label: body.label || body.fileName || "Uploaded Asset",
      aiPromptDirective: body.aiPromptDirective,
      targetSceneOrder: body.targetSceneOrder,
      duration: body.duration,
      dimensions: body.dimensions || "1080x1920",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      status: "SUCCESS",
      asset: responseAsset,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process upload", details: String(error) },
      { status: 500 }
    );
  }
}
