import React from 'react';

// Prevents an unhandled runtime error anywhere in the tree from
// producing a totally blank white page — shows a plain message
// instead. Does not change any LUNA UI/logic; this only wraps it.
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('LUNA runtime error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9fafb',
          fontFamily: 'sans-serif',
          padding: '24px',
        }}>
          <div style={{
            maxWidth: '28rem',
            width: '100%',
            background: 'white',
            border: '1px solid #fecaca',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            padding: '1.5rem',
            textAlign: 'center',
          }}>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
              Something went wrong
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
              {this.state.error.message || 'The application hit an unexpected error.'}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
