import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export const useButtonState = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIsSubmitFalse = () => setIsSubmitting(false);

  const handleIsSubmitTrue = () => setIsSubmitting(true);

  const StateButton = () => {
    return (
      <Button>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" />
            Please wait
          </span>
        ) : (
          'Submit'
        )}
      </Button>
    );
  };

  return {
    StateButton,
    handleIsSubmitFalse,
    handleIsSubmitTrue,
    isSubmitting
  };
};
