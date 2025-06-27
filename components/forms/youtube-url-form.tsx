'use client';

import { useState } from 'react';
import { Youtube, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateYouTubeUrl, type YouTubeValidationResult } from '@/lib/validations';

interface YouTubeUrlFormProps {
  onSubmit: (data: { url: string; videoId: string; }) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function YouTubeUrlForm({ onSubmit, isLoading = false, disabled = false }: YouTubeUrlFormProps) {
  const [url, setUrl] = useState('');
  const [validation, setValidation] = useState<YouTubeValidationResult | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Real-time validation on input change
  const handleUrlChange = (value: string) => {
    setUrl(value);

    // Only show validation after user has attempted to submit once
    if (hasAttemptedSubmit) {
      const result = validateYouTubeUrl(value);
      setValidation(result);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const result = validateYouTubeUrl(url);
    setValidation(result);

    if (result.isValid && result.videoId) {
      onSubmit({
        url: result.normalizedUrl!,
        videoId: result.videoId,
      });
    }
  };

  const isValid = validation?.isValid ?? false;
  const error = validation?.error;
  const showSuccess = hasAttemptedSubmit && isValid && !isLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="youtube-url" className="text-sm font-medium text-foreground">
          YouTube URL
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Youtube className="h-4 w-4" />
          </div>
          <Input
            id="youtube-url"
            type="url"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className={`pl-10 pr-10 ${hasAttemptedSubmit
              ? isValid
                ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                : error
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : ''
              : ''
              }`}
            disabled={disabled || isLoading}
            aria-invalid={hasAttemptedSubmit && !isValid}
            aria-describedby={
              error ? 'youtube-url-error' : showSuccess ? 'youtube-url-success' : undefined
            }
          />
          {hasAttemptedSubmit && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : isValid ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : error ? (
                <AlertCircle className="h-4 w-4 text-red-500" />
              ) : null}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && hasAttemptedSubmit && (
          <Alert variant="destructive" id="youtube-url-error">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success message */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800" id="youtube-url-success">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription>
              Valid YouTube URL detected! Video ID: {validation?.videoId}
            </AlertDescription>
          </Alert>
        )}

        {/* Help text */}
        <p className="text-xs text-muted-foreground">
          Supported formats: youtube.com/watch?v=..., youtu.be/..., youtube.com/embed/...
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={disabled || isLoading || (hasAttemptedSubmit && !isValid)}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Youtube className="mr-2 h-4 w-4" />
            Analyze Video
          </>
        )}
      </Button>
    </form>
  );
} 