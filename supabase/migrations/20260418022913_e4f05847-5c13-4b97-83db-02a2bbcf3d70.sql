-- 1) Harden user_roles: remove duplicate ALL policies and add explicit, restrictive policies
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;

-- Only admins can SELECT/INSERT/UPDATE/DELETE roles. Non-admins (and unauthenticated) cannot
-- grant themselves any role. Users can still view their own role via the existing
-- "Users can view their own roles" policy.
CREATE POLICY "Admins select user roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins insert user roles"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins update user roles"
  ON public.user_roles
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins delete user roles"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 2) Remove the duplicate / weakly-controlled `project_images` (underscore) storage bucket policy.
-- The legitimate bucket is `project-images` (hyphen). The underscore variant only had a public
-- SELECT policy with no admin write controls.
DROP POLICY IF EXISTS "Project images are publicly accessible" ON storage.objects;