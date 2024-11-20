import type { Metadata } from 'next';

export interface GenerateMetadataArgs {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export type GenerateMetadataSync = (
    generateMetadataArgs: GenerateMetadataArgs,
) => Metadata;

export type GenerateMetadataAsync = (
    generateMetadataArgs: GenerateMetadataArgs,
) => Promise<Metadata>;

export type GenerateMetadata = GenerateMetadataSync | GenerateMetadataAsync;
