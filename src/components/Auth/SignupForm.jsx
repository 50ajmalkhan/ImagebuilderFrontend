          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-600">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('auth.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 bg-[#1a1f2e] border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(26,31,46)] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:-webkit-text-fill-color-white"
                  placeholder={t('auth.email')}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('auth.password')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 bg-[#1a1f2e] border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(26,31,46)] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:-webkit-text-fill-color-white"
                  placeholder={t('auth.password')}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('auth.confirmPassword')}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 bg-[#1a1f2e] border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(26,31,46)] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:-webkit-text-fill-color-white"
                  placeholder={t('auth.confirmPassword')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                {loading ? t('common.loading') : t('auth.signup')}
              </button>
            </div>
          </form> 